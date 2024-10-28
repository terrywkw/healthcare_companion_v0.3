import React, { useState, useCallback } from 'react';
import { Mic, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VoiceMessageInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');

  // Mock responses for demo
  const mockResponses = {
    "what's my blood pressure": "Your last blood pressure reading was 120/80, taken yesterday at 9 AM.",
    "schedule a doctor appointment": "I can help you schedule an appointment. Dr. Smith has availability next Tuesday at 2 PM.",
    "remind me to take medication": "I've set a reminder for your medication. I'll notify you at your usual time of 9 AM.",
    "how am i doing today": "Based on your vitals today, you're doing well. Your heart rate and blood pressure are within normal ranges.",
    "default": "I heard you, but I'm not sure how to help with that. Could you please rephrase?"
  };

  const startListening = useCallback(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window.webkitSpeechRecognition)();
      recognition.continuous = false;
      recognition.interimResults = true;

      // Add a "listening" message when starting
      const listeningMessageId = Date.now();
      setMessages(prev => [...prev, {
        id: listeningMessageId,
        type: 'voice-input',
        status: 'listening',
        content: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);

      recognition.onstart = () => {
        setIsListening(true);
        setCurrentTranscript('');
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setCurrentTranscript(transcript);
        
        // Update the listening message with the current transcript
        setMessages(prev => prev.map(msg => 
          msg.id === listeningMessageId 
            ? { ...msg, content: transcript }
            : msg
        ));
      };

      recognition.onend = () => {
        setIsListening(false);
        // Remove the listening status and update message type
        setMessages(prev => prev.map(msg => 
          msg.id === listeningMessageId 
            ? { 
                ...msg, 
                type: 'user',
                status: 'completed'
              }
            : msg
        ));

        // Add AI response
        setTimeout(() => {
          const response = mockResponses[currentTranscript.toLowerCase()] || mockResponses.default;
          setMessages(prev => [...prev, {
            id: Date.now(),
            type: 'ai',
            content: response,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        }, 500);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  }, [currentTranscript]);

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'user',
        content: inputText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setInputText('');
    }
  };

  // Message Bubble Component
  const MessageBubble = ({ message }) => {
    const isVoiceInput = message.type === 'voice-input';
    const isUser = message.type === 'user';

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isUser || isVoiceInput ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div
          className={`max-w-[80%] rounded-lg p-4 ${
            isUser || isVoiceInput
              ? 'bg-blue-600 text-white'
              : 'bg-white shadow-sm border border-gray-200'
          }`}
        >
          {isVoiceInput ? (
            <div className="space-y-2">
              {/* Voice Input Status */}
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Mic className="w-4 h-4" />
                </motion.div>
                <span className="text-sm">Listening...</span>
              </div>

              {/* Voice Visualization */}
              <div className="flex justify-center space-x-1 h-8">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-white bg-opacity-80"
                    animate={{ 
                      height: [12, 24, 12],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>

              {/* Transcript */}
              {message.content && (
                <div className="text-sm mt-2">
                  <p className="text-white text-opacity-80">I heard:</p>
                  <p>{message.content}</p>
                </div>
              )}
            </div>
          ) : (
            <>
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${
                isUser ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp}
              </p>
            </>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={startListening}
            disabled={isListening}
          >
            <Mic className={`w-6 h-6 ${isListening ? 'text-red-500' : ''}`} />
          </motion.button>
          <motion.button
            className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default VoiceMessageInterface;
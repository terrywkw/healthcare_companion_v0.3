import React, { useState, useEffect, useCallback } from 'react';
import { 
  Mic, Send, Image, Plus, Menu, Bell, Heart, Calendar, 
  Activity, Phone, AlertCircle, Settings, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../../layout/Navigation';

// Metric Card Component
const MetricCard = ({ title, value, trend }) => (
  <div className="flex items-start justify-between p-3 bg-white rounded-lg">
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
    <span className={`px-3 py-1 rounded-full text-sm ${
      trend === 'stable' ? 'bg-blue-100 text-blue-800' :
      trend === 'improving' ? 'bg-green-100 text-green-800' :
      'bg-orange-100 text-orange-800'
    }`}>
      {trend}
    </span>
  </div>
);

// Quick Action Button Component
const QuickActionButton = ({ text, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
  >
    {text}
  </motion.button>
);

const AdvancedHealthHub = ({ isInModal = false, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Contextual suggestions
  const contextualSuggestions = {
    morning: ["Track morning vitals", "Log breakfast", "Take medications"],
    medication: ["View schedule", "Mark as taken", "Check interactions"],
    appointment: ["View details", "Reschedule", "Add to calendar"],
    emergency: ["Call emergency", "View vital history", "Contact family"]
  };

  // Health metrics
  const healthMetrics = {
    bloodPressure: { value: "120/80", trend: "stable" },
    heartRate: { value: "72", trend: "improving" },
    bloodSugar: { value: "95", trend: "warning" }
  };

  // AI response handler
  const getAIResponse = (input) => {
    const responses = {
      "blood pressure": "Your blood pressure is 120/80 mmHg, which has been trending stable. Would you like to log a new reading?",
      "heart rate": "Your heart rate is 72 bpm and has been improving. Would you like to see your heart rate trends?",
      "blood sugar": "Your blood sugar is 95 mg/dL. I notice it's slightly elevated. Would you like to review your diet log?",
      "vitals": "Here are your current vitals. Everything looks stable except for a slight elevation in blood sugar. Should we log new readings?",
      "track": "I can help you track your health metrics. What would you like to record?",
      "medication": "Your next medication (Metformin 500mg) is due at 2:00 PM. Would you like me to set a reminder?",
      "default": "I understand you're asking about {input}. How can I help you with that?"
    };

    const lowercaseInput = input.toLowerCase();
    for (const [key, value] of Object.entries(responses)) {
      if (lowercaseInput.includes(key)) {
        return value;
      }
    }
    return responses.default.replace("{input}", input);
  };

  // Voice recognition handler
  const startListening = useCallback(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window.webkitSpeechRecognition)();
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setCurrentTranscript('');
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: 'voice-input',
          status: 'listening',
          content: '',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setCurrentTranscript(transcript);
        
        setMessages(prev => prev.map(msg => 
          msg.type === 'voice-input' && msg.status === 'listening'
            ? { ...msg, content: transcript }
            : msg
        ));
      };

      recognition.onend = () => {
        setIsListening(false);
        if (currentTranscript) {
          setMessages(prev => {
            const updatedMessages = prev.map(msg => 
              msg.type === 'voice-input' && msg.status === 'listening'
                ? { 
                    ...msg, 
                    type: 'user',
                    status: 'completed',
                    content: currentTranscript
                  }
                : msg
            );

            const shouldIncludeMetrics = currentTranscript.toLowerCase().includes('vitals') || 
                                       currentTranscript.toLowerCase().includes('health') ||
                                       currentTranscript.toLowerCase().includes('pressure');

            setTimeout(() => {
              const response = getAIResponse(currentTranscript);
              setMessages([...updatedMessages, {
                id: Date.now(),
                type: 'ai',
                content: response,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                suggestions: contextualSuggestions.morning,
                ...(shouldIncludeMetrics && { metrics: healthMetrics })
              }]);
              setIsTyping(false);
            }, 1000);

            return updatedMessages;
          });
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  }, [currentTranscript]);

  // Message sending handler
  const handleSend = () => {
    if (inputText.trim()) {
      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: inputText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMessage]);
      setInputText('');
      setIsTyping(true);

      const shouldIncludeMetrics = inputText.toLowerCase().includes('vitals') || 
                                 inputText.toLowerCase().includes('health') ||
                                 inputText.toLowerCase().includes('pressure');

      setTimeout(() => {
        const response = getAIResponse(inputText);
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: 'ai',
          content: response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: contextualSuggestions.morning,
          ...(shouldIncludeMetrics && { metrics: healthMetrics })
        }]);
        setIsTyping(false);
      }, 1000);
    }
  };

  // Initial greeting
  useEffect(() => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages([{
        id: 1,
        type: 'ai',
        content: "Welcome back! I notice it's time for your morning check-in. Would you like to log your vitals?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ["Track morning vitals", "Log breakfast", "Take medications"],
        metrics: healthMetrics
      }]);
      setIsTyping(false);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col h-[100dvh] bg-gray-50">
      <Navigation 
        isInModal={isInModal} 
        onModalClose={onClose}
      />
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 pb-safe">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' || message.type === 'voice-input' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                message.type === 'user' || message.type === 'voice-input'
                  ? 'bg-blue-600 text-white ml-auto'
                  : 'bg-white shadow-sm border border-gray-100'
              }`}>
                {message.type === 'voice-input' && message.status === 'listening' ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <Mic className="w-4 h-4" />
                      </motion.div>
                      <span className="text-sm">Listening...</span>
                    </div>
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
                    
                    {message.type === 'ai' && message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.suggestions.map((suggestion, index) => (
                          <QuickActionButton
                            key={index}
                            text={suggestion}
                            onClick={() => {
                              setInputText(suggestion);
                              handleSend();
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {message.type === 'ai' && message.metrics && (
                      <div className="grid grid-cols-1 gap-4 mt-4 bg-gray-50 p-4 rounded-xl">
                        <MetricCard
                          title="Blood Pressure"
                          value={message.metrics.bloodPressure.value}
                          trend={message.metrics.bloodPressure.trend}
                        />
                        <MetricCard
                          title="Heart Rate"
                          value={message.metrics.heartRate.value}
                          trend={message.metrics.heartRate.trend}
                        />
                        <MetricCard
                          title="Blood Sugar"
                          value={message.metrics.bloodSugar.value}
                          trend={message.metrics.bloodSugar.trend}
                        />
                      </div>
                    )}

                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2 p-3 bg-white rounded-lg w-20"
            >
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <motion.div 
        className="sticky bottom-0 bg-white border-t p-4 pb-safe"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <div className="flex items-center space-x-2">
          <motion.button
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Plus className="w-6 h-6" />
          </motion.button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
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
      </motion.div>
    </div>
  );
};

export default AdvancedHealthHub;
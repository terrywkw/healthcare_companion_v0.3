import React, { useState, useEffect, useCallback } from 'react';
import { 
  MessageCircle, Mic, Send, Image, Menu, Bell, Heart, Calendar, 
  Activity, Phone, AlertCircle, Settings, ChevronDown, X, Plus,
  Thermometer, Pill, Stethoscope, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdvancedHealthHub = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [activeContext, setActiveContext] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');  

  // mock responses for voice input
  const mockResponses = {
    "what's my blood pressure": "Your last blood pressure reading was 120/80, taken yesterday at 9 AM.",
    "schedule a doctor appointment": "I can help you schedule an appointment. Dr. Smith has availability next Tuesday at 2 PM.",
    "remind me to take medication": "I've set a reminder for your medication. I'll notify you at your usual time of 9 AM.",
    "how am i doing today": "Based on your vitals today, you're doing well. Your heart rate and blood pressure are within normal ranges.",
    "default": "I heard you, but I'm not sure how to help with that. Could you please rephrase?"
  };

  const startVoiceInput = useCallback(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window.webkitSpeechRecognition)();
      recognition.continuous = false;
      recognition.interimResults = true;

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
        
        setMessages(prev => prev.map(msg => 
          msg.id === listeningMessageId 
            ? { ...msg, content: transcript }
            : msg
        ));
      };

      recognition.onend = () => {
        setIsListening(false);
        
        setMessages(prev => {
          const messages = prev.map(msg => 
            msg.id === listeningMessageId 
              ? { 
                  ...msg, 
                  type: 'user',
                  status: 'completed'
                }
              : msg
          );

          const response = mockResponses[currentTranscript.toLowerCase()] || mockResponses.default;
          return [...messages, {
            id: Date.now(),
            type: 'ai',
            content: response,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }];
        });
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  }, [currentTranscript]);
  
  const contextualSuggestions = {
    morning: ["Track morning vitals", "Log breakfast", "Take medications"],
    medication: ["View schedule", "Mark as taken", "Check interactions"],
    appointment: ["View details", "Reschedule", "Add to calendar"],
    emergency: ["Call emergency", "View vital history", "Contact family"]
  };

  const healthMetrics = {
    bloodPressure: { value: "120/80", trend: "stable" },
    heartRate: { value: "72", trend: "improving" },
    bloodSugar: { value: "95", trend: "warning" }
  };

  useEffect(() => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages([{
        id: 1,
        type: 'ai',
        content: "Welcome back! I notice it's time for your morning check-in. Would you like to log your vitals?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: contextualSuggestions.morning
      }]);
      setIsTyping(false);
    }, 1500);
  }, []);

  const handleSend = () => {
    if (inputText.trim()) {
      const userMessage = {
        id: messages.length + 1,
        type: 'user',
        content: inputText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMessage]);
      setInputText('');
      setIsTyping(true);

      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: 'ai',
          content: "I'll help you with that. I notice your blood pressure has been trending stable. Would you like to log a new reading?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: ['Log blood pressure', 'View BP history', 'Skip for now'],
          metrics: healthMetrics
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const QuickMetricCard = ({ title, value, trend, onExpand }) => (
    <motion.div
      className="bg-white p-4 rounded-lg shadow-sm cursor-pointer"
      whileHover={{ scale: 1.02 }}
      onClick={onExpand}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${
          trend === 'improving' ? 'bg-green-100 text-green-800' :
          trend === 'warning' ? 'bg-orange-100 text-orange-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {trend}
        </span>
      </div>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </motion.div>
  );

  const ContextualSuggestion = ({ text, onClick }) => (
    <motion.button
      className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <motion.div 
        className="bg-white shadow-sm p-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => setShowQuickMenu(!showQuickMenu)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg font-semibold">Health Assistant</h1>
              <p className="text-sm text-gray-500">Morning Check-in</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              className="p-2 rounded-full hover:bg-gray-100 relative"
              whileHover={{ scale: 1.1 }}
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />
            </motion.button>
            <motion.div 
              className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <img src="https://picsum.photos/40/40" alt="Profile" className="rounded-full" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showQuickMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white border-b"
          >
            <div className="grid grid-cols-4 gap-4 p-4">
              {['Vitals', 'Medications', 'Appointments', 'Emergency'].map((item, index) => (
                <motion.button
                  key={item}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item === 'Vitals' && <Activity className="w-6 h-6 text-blue-500" />}
                  {item === 'Medications' && <Pill className="w-6 h-6 text-green-500" />}
                  {item === 'Appointments' && <Calendar className="w-6 h-6 text-purple-500" />}
                  {item === 'Emergency' && <AlertCircle className="w-6 h-6 text-red-500" />}
                  <span className="text-xs mt-1">{item}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                message.type === 'user' || message.type === 'voice-input' 
                  ? 'justify-end' 
                  : 'justify-start'
              } mb-4`}
            >
              <div className={`max-w-[80%] rounded-lg p-4 ${
                message.type === 'user' || message.type === 'voice-input'
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white shadow-sm'
              }`}>
                {message.type === 'voice-input' ? (
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

                    <div className="flex justify-center space-x-1 h-8">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-white bg-opacity-80"
                          animate={{ height: [12, 24, 12] }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.8,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
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
                    {message.suggestions && (
                      <motion.div 
                        className="mt-3 flex flex-wrap gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {message.suggestions.map((suggestion, index) => (
                          <ContextualSuggestion 
                            key={index}
                            text={suggestion}
                            onClick={() => setActiveContext(suggestion)}
                          />
                        ))}
                      </motion.div>
                    )}
                    {message.metrics && (
                      <motion.div 
                        className="mt-4 grid grid-cols-2 gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {Object.entries(message.metrics).map(([key, data], index) => (
                          <QuickMetricCard
                            key={key}
                            title={key.replace(/([A-Z])/g, ' $1').trim()}
                            value={data.value}
                            trend={data.trend}
                            onExpand={() => setExpandedCard(key)}
                          />
                        ))}
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          ))}

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

      <motion.div 
        className="bg-white border-t p-4"
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
            placeholder="Ask me anything..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={startVoiceInput}
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

      <AnimatePresence>
        {expandedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={() => setExpandedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Detailed View</h2>
                <button onClick={() => setExpandedCard(null)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              {/* Add detailed metric content here */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedHealthHub;
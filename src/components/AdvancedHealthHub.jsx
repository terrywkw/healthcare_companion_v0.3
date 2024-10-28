import React, { useState, useEffect } from 'react';
import { 
  Mic, Send, Image, Plus, Thermometer, 
  Pill, Stethoscope, ArrowRight
} from 'lucide-react';
import Navigation from './Navigation';
import { motion, AnimatePresence } from 'framer-motion';

const AdvancedHealthHub = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [activeContext, setActiveContext] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  // Contextual suggestions based on time and user data
  const contextualSuggestions = {
    morning: ["Track morning vitals", "Log breakfast", "Take medications"],
    medication: ["View schedule", "Mark as taken", "Check interactions"],
    appointment: ["View details", "Reschedule", "Add to calendar"],
    emergency: ["Call emergency", "View vital history", "Contact family"]
  };

  // Simulated health metrics
  const healthMetrics = {
    bloodPressure: { value: "120/80", trend: "stable" },
    heartRate: { value: "72", trend: "improving" },
    bloodSugar: { value: "95", trend: "warning" }
  };

  useEffect(() => {
    // Simulate initial AI greeting with typing indicator
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

      // Simulate AI analyzing and responding
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

  // const QuickMetricCard = ({ title, value, trend, onExpand }) => (
  //   <motion.div
  //     className="bg-white p-4 rounded-lg shadow-sm cursor-pointer"
  //     whileHover={{ scale: 1.02 }}
  //     onClick={onExpand}
  //   >
  //     <div className="flex justify-between items-center">
  //       <h3 className="text-sm font-medium">{title}</h3>
  //       <span className={`text-xs px-2 py-1 rounded-full ${
  //         trend === 'improving' ? 'bg-green-100 text-green-800' :
  //         trend === 'warning' ? 'bg-orange-100 text-orange-800' :
  //         'bg-blue-100 text-blue-800'
  //       }`}>
  //         {trend}
  //       </span>
  //     </div>
  //     <p className="text-2xl font-semibold mt-2">{value}</p>
  //   </motion.div>
  // );

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
      <Navigation />
      
      {/* Dynamic Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div className={`max-w-[80%] rounded-lg p-4 ${
                message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white shadow-sm'
              }`}>
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
                  </motion.div>
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

      {/* Enhanced Input Area */}
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
            onClick={() => setIsListening(!isListening)}
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
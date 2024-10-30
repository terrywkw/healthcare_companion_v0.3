import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import AdvancedHealthHub from '../pages/AdvancedHealthHub/AdvancedHealthHub';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Hide the floating button on the home/chat page
  if (location.pathname === '/') {
    return null;
  }

  const handleButtonClick = () => {
    if (window.innerWidth >= 1024) { // Desktop view
      setIsOpen(true);
    } else { // Mobile view
      navigate('/'); // Navigate to main chat page on mobile
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="fixed right-0 top-0 h-full w-full max-w-lg bg-gray-50"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              <AdvancedHealthHub isInModal={true} onClose={() => setIsOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="fixed right-6 bottom-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        onClick={handleButtonClick}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </>
  );
};

export default FloatingChat;
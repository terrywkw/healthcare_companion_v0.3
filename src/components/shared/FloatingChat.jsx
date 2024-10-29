import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdvancedHealthHub from '../pages/AdvancedHealthHub/AdvancedHealthHub';
import { useLocation } from 'react-router-dom';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Check if we're at the root path (AdvancedHealthHub)
  if (location.pathname === '/') {
    return null;
  }

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
              className="fixed inset-0 bg-gray-50"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              <AdvancedHealthHub isInModal={true} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="fixed right-6 bottom-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </>
  );
};

export default FloatingChat;
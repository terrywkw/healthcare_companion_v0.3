import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, Bell, Activity, Pill, Calendar, 
  AlertCircle, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { title: 'Vitals', icon: Activity, path: '/vitals', color: 'text-blue-500' },
    { title: 'Medications', icon: Pill, path: '/medications', color: 'text-green-500' },
    { title: 'Appointments', icon: Calendar, path: '/appointments', color: 'text-purple-500' },
    { title: 'Emergency', icon: AlertCircle, path: '/emergency', color: 'text-red-500' }
  ];

  const getPageTitle = () => {
    const currentPath = location.pathname.substring(1);
    return currentPath.charAt(0).toUpperCase() + currentPath.slice(1) || 'Health Assistant';
  };

  return (
    <>
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
              <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
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
              <img src="/api/placeholder/40/40" alt="Profile" className="rounded-full" />
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
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.title}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    navigate(item.path);
                    setShowQuickMenu(false);
                  }}
                >
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                  <span className="text-xs mt-1">{item.title}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
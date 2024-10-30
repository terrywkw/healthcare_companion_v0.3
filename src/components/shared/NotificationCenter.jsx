import React, { useState } from 'react';
import { 
  Bell, X, Pill, Calendar, Activity, AlertCircle, 
  Clock, ChevronRight, Settings, Check, 
  RefreshCcw, Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationCenter = ({ isOpen, onClose }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'medication',
      title: 'Medication Due',
      message: 'Time to take Metformin (500mg)',
      time: '2 minutes ago',
      priority: 'high',
      icon: Pill,
      color: 'blue',
      action: 'Mark as Taken',
      read: false
    },
    {
      id: 2,
      type: 'appointment',
      title: 'Upcoming Appointment',
      message: 'Dr. Smith tomorrow at 2:00 PM',
      time: '1 hour ago',
      priority: 'medium',
      icon: Calendar,
      color: 'purple',
      action: 'View Details',
      read: false
    },
    {
      id: 3,
      type: 'vitals',
      title: 'Blood Pressure Alert',
      message: 'Your blood pressure is higher than usual',
      time: '3 hours ago',
      priority: 'medium',
      icon: Activity,
      color: 'orange',
      action: 'Check Reading',
      read: true
    },
    {
      id: 4,
      type: 'emergency',
      title: 'Emergency Contact Updated',
      message: 'John Smith has been added as emergency contact',
      time: '1 day ago',
      priority: 'low',
      icon: AlertCircle,
      color: 'red',
      action: 'Review',
      read: true
    }
  ]);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'medication', label: 'Medications' },
    { id: 'appointment', label: 'Appointments' },
    { id: 'vitals', label: 'Vitals' }
  ];

  const handleMarkAsRead = (notificationId) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notification.read;
    return notification.type === activeFilter;
  });

  const NotificationItem = ({ notification }) => {
    const IconComponent = notification.icon;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`p-4 border-b last:border-b-0 ${
          !notification.read ? 'bg-blue-50' : ''
        }`}
      >
        <div className="flex items-start space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            `bg-${notification.color}-100`
          }`}>
            <IconComponent className={`w-5 h-5 text-${notification.color}-600`} />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{notification.title}</h3>
                <p className="text-sm text-gray-600 mt-0.5">{notification.message}</p>
              </div>
              {!notification.read && (
                <button
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Check className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {notification.time}
              </span>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                {notification.action}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-3">
                <Bell className="w-6 h-6 text-blue-500" />
                <div>
                  <h2 className="text-lg font-semibold">Notifications</h2>
                  <p className="text-sm text-gray-500">
                    {notifications.filter(n => !n.read).length} unread
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  onClick={() => {}}
                >
                  <Settings className="w-5 h-5 text-gray-600" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  onClick={onClose}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Filters */}
            <div className="p-4 border-b">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                      activeFilter === filter.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveFilter(filter.id)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto" style={{ height: 'calc(100vh - 180px)' }}>
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map(notification => (
                  <NotificationItem 
                    key={notification.id} 
                    notification={notification} 
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Bell className="w-12 h-12 mb-2 text-gray-400" />
                  <p>No notifications</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
                <button
                  className="w-full py-2 text-gray-600 hover:text-gray-800 text-sm font-medium"
                  onClick={handleClearAll}
                >
                  Clear All Notifications
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationCenter;
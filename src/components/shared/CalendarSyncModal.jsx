import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Calendar, Download, ExternalLink, 
  Mail, Check, AlertCircle, Globe
} from 'lucide-react';

const CalendarSyncModal = ({ isOpen, onClose, appointmentDetails }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [syncStatus, setSyncStatus] = useState(null);

  const calendarServices = [
    {
      id: 'google',
      name: 'Google Calendar',
      icon: '/api/placeholder/24/24', // Replace with actual Google Calendar icon
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 'apple',
      name: 'Apple Calendar',
      icon: '/api/placeholder/24/24', // Replace with actual Apple Calendar icon
      color: 'bg-gray-100 text-gray-600'
    },
    {
      id: 'outlook',
      name: 'Outlook Calendar',
      icon: '/api/placeholder/24/24', // Replace with actual Outlook icon
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'ics',
      name: 'Download ICS File',
      icon: '/api/placeholder/24/24',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const handleSync = async (service) => {
    setSelectedService(service);
    setSyncStatus('syncing');

    // Simulate API call
    setTimeout(() => {
      setSyncStatus('success');
    }, 1500);

    // Here you would implement the actual calendar sync logic
    // For Google Calendar: OAuth flow
    // For Apple Calendar: Generate ICS with special URL scheme
    // For Outlook: OAuth or URL scheme
    // For ICS: Generate and download file
  };

  const generateICS = () => {
    // Generate ICS file content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${appointmentDetails.type} with ${appointmentDetails.provider}
DTSTART:${new Date(appointmentDetails.date + 'T' + appointmentDetails.time).toISOString()}
DURATION:PT1H
DESCRIPTION:${appointmentDetails.notes || 'Medical appointment'}
LOCATION:${appointmentDetails.location || 'Virtual'}
END:VEVENT
END:VCALENDAR`;

    // Create and download file
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'appointment.ics';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl w-full max-w-md"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-semibold">Add to Calendar</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Appointment Summary */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <h3 className="font-medium text-gray-700">
                  {appointmentDetails.type}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(appointmentDetails.date).toLocaleDateString()} at {appointmentDetails.time}
                </p>
                <p className="text-sm text-gray-500">
                  with {appointmentDetails.provider}
                </p>
              </div>

              {/* Calendar Services */}
              <div className="space-y-2">
                {calendarServices.map(service => (
                  <motion.button
                    key={service.id}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border-2 ${
                      selectedService === service.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                    onClick={() => {
                      if (service.id === 'ics') {
                        generateICS();
                      } else {
                        handleSync(service.id);
                      }
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${service.color}`}>
                        <img src={service.icon} alt="" className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{service.name}</span>
                    </div>
                    {selectedService === service.id && syncStatus === 'success' && (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Email Reminder Option */}
              <div className="mt-4 p-3 border rounded-lg">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-medium">Email me a calendar invitation</span>
                    <p className="text-sm text-gray-500">
                      Receive the event details via email
                    </p>
                  </div>
                </label>
              </div>

              {/* Status Messages */}
              {syncStatus === 'syncing' && (
                <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-lg flex items-center">
                  <Globe className="w-5 h-5 mr-2 animate-spin" />
                  Syncing with calendar...
                </div>
              )}
              {syncStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center">
                  <Check className="w-5 h-5 mr-2" />
                  Successfully added to calendar
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-gray-50">
              <p className="text-sm text-gray-500 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                You can always update this event in your calendar later
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CalendarSyncModal;
import React, { useState } from 'react';
import { 
  Phone, AlertCircle, MapPin, User, Heart, 
  Clock, FileText, Share2, Volume2, Plus,
  Bell, ChevronDown, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../../layout/Navigation';
import FloatingChat from '../../shared/FloatingChat';

const EmergencyPage = () => {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [showEmergencyInfo, setShowEmergencyInfo] = useState(false);

  // Mock emergency contacts
  const emergencyContacts = [
    { id: 1, name: "John Smith", relation: "Spouse", phone: "555-0123" },
    { id: 2, name: "Dr. Sarah Johnson", relation: "Primary Doctor", phone: "555-0124" }
  ];

  // Mock critical health information
  const criticalInfo = {
    conditions: ["Type 2 Diabetes", "Hypertension"],
    allergies: ["Penicillin", "Sulfa drugs"],
    medications: ["Metformin", "Lisinopril"],
    bloodType: "A+"
  };

  const EmergencyButton = () => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full bg-red-500 text-white rounded-xl p-6 shadow-lg hover:bg-red-600 transition-colors"
      onClick={() => setIsEmergencyActive(true)}
    >
      <div className="flex flex-col items-center">
        <Phone className="w-12 h-12 mb-2" />
        <span className="text-xl font-bold">Emergency Assistance</span>
        <span className="text-sm opacity-90 mt-1">Tap to call emergency services</span>
      </div>
    </motion.button>
  );

  const QuickAction = ({ icon: Icon, label, onClick }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm"
      onClick={onClick}
    >
      <Icon className="w-6 h-6 mb-2 text-gray-600" />
      <span className="text-sm text-gray-700 text-center">{label}</span>
    </motion.button>
  );

  const CriticalInfoCard = () => (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Critical Health Information</h3>
        <button 
          className="text-blue-500 text-sm hover:text-blue-600"
          onClick={() => setShowEmergencyInfo(true)}
        >
          View Full Info
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Medical Conditions</p>
          <div className="flex flex-wrap gap-2">
            {criticalInfo.conditions.map((condition, index) => (
              <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                {condition}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Allergies</p>
          <div className="flex flex-wrap gap-2">
            {criticalInfo.allergies.map((allergy, index) => (
              <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                {allergy}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Blood Type</p>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {criticalInfo.bloodType}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const EmergencyContactsList = () => (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Emergency Contacts</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="space-y-3">
        {emergencyContacts.map(contact => (
          <div 
            key={contact.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-gray-500">{contact.relation}</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{contact.phone}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-3xl mx-auto px-4 py-6 flex-1 overflow-y-auto">
        {/* Emergency Alert Banner */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-red-800 font-medium">Emergency Features</h2>
              <p className="text-red-600 text-sm mt-1">
                These features are designed for emergency situations. For immediate life-threatening emergencies, 
                always call your local emergency services directly.
              </p>
            </div>
          </div>
        </div>

        {/* Main Emergency Button */}
        <div className="mb-6">
          <EmergencyButton />
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <QuickAction 
            icon={Share2} 
            label="Share Location with Emergency Contacts" 
            onClick={() => {}}
          />
          <QuickAction 
            icon={FileText} 
            label="View Emergency Information Card" 
            onClick={() => setShowEmergencyInfo(true)}
          />
          <QuickAction 
            icon={Volume2} 
            label="Sound Emergency Alarm" 
            onClick={() => {}}
          />
          <QuickAction 
            icon={Bell} 
            label="Alert Emergency Contacts" 
            onClick={() => {}}
          />
        </div>

        {/* Critical Info Card */}
        <div className="mb-6">
          <CriticalInfoCard />
        </div>

        {/* Emergency Contacts */}
        <div className="mb-6">
          <EmergencyContactsList />
        </div>
      </div>
      
      <FloatingChat />

      {/* Emergency Active Modal */}
      <AnimatePresence>
        {isEmergencyActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl max-w-md w-full p-6 text-center"
            >
              <div className="animate-pulse mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="w-8 h-8 text-red-500" />
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2">Contacting Emergency Services</h2>
              <p className="text-gray-600 mb-6">
                Stay calm. Help is on the way. Your location and critical medical information 
                will be shared with emergency responders.
              </p>
              <button
                className="w-full bg-red-500 text-white rounded-lg py-3 font-medium hover:bg-red-600"
                onClick={() => setIsEmergencyActive(false)}
              >
                Cancel Emergency
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmergencyPage;
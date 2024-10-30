import React, { useState } from 'react';
import { 
  User, Settings, Shield, Bell, Heart, 
  Clock, Calendar, Activity, Lock,
  Edit, Camera, ChevronRight, LogOut,
  FileText, Share2, HelpCircle, Phone, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import Navigation from '../../layout/Navigation';
import FloatingChat from '../../shared/FloatingChat';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  
  // Mock user data
  const userData = {
    personal: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      dateOfBirth: "1985-06-15",
      gender: "Male",
      address: "123 Health Street, Medical City, MC 12345",
      emergencyContact: {
        name: "Jane Smith",
        relation: "Spouse",
        phone: "+1 (555) 987-6543"
      }
    },
    health: {
      bloodType: "A+",
      height: "5'10\"",
      weight: "165 lbs",
      allergies: ["Penicillin", "Peanuts"],
      conditions: ["Type 2 Diabetes", "Hypertension"],
      medications: ["Metformin", "Lisinopril"]
    },
    preferences: {
      notifications: {
        medications: true,
        appointments: true,
        vitals: true,
        reports: false
      },
      theme: "light",
      language: "English",
      timeZone: "EST"
    }
  };

  const TabButton = ({ label, isActive, onClick }) => (
    <button
      className={`px-4 py-2 rounded-full text-sm font-medium ${
        isActive 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );

  const SectionCard = ({ title, icon: Icon, children }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
        >
          <Edit className="w-5 h-5" />
        </motion.button>
      </div>
      {children}
    </div>
  );

  const PersonalInfoSection = () => (
    <div className="space-y-4">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <img 
            src="https://avatars.githubusercontent.com/u/1084231?v=4/96/96" 
            alt="Profile" 
            className="rounded-full w-full h-full object-cover"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white shadow-lg"
          >
            <Camera className="w-4 h-4" />
          </motion.button>
        </div>
        <h2 className="text-xl font-bold">{userData.personal.name}</h2>
        <p className="text-gray-500 mt-1">{userData.personal.email}</p>
        <div className="flex justify-center items-center space-x-2 mt-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
            Patient ID: #12345
          </span>
        </div>
      </div>

      {/* Contact Information */}
      <SectionCard title="Contact Information" icon={Phone}>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{userData.personal.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{userData.personal.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{userData.personal.address}</p>
          </div>
        </div>
      </SectionCard>

      {/* Emergency Contact */}
      <SectionCard title="Emergency Contact" icon={Phone}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{userData.personal.emergencyContact.name}</p>
              <p className="text-sm text-gray-500">{userData.personal.emergencyContact.relation}</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{userData.personal.emergencyContact.phone}</span>
            </button>
          </div>
        </div>
      </SectionCard>
    </div>
  );

  const HealthInfoSection = () => (
    <div className="space-y-4">
      {/* Basic Health Info */}
      <SectionCard title="Basic Health Information" icon={Heart}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Blood Type</p>
            <p className="font-medium">{userData.health.bloodType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Height</p>
            <p className="font-medium">{userData.health.height}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Weight</p>
            <p className="font-medium">{userData.health.weight}</p>
          </div>
        </div>
      </SectionCard>

      {/* Medical Conditions */}
      <SectionCard title="Medical Conditions" icon={Activity}>
        <div className="space-y-3">
          {userData.health.conditions.map((condition, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
            >
              <span className="font-medium">{condition}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Allergies */}
      <SectionCard title="Allergies" icon={AlertCircle}>
        <div className="flex flex-wrap gap-2">
          {userData.health.allergies.map((allergy, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
            >
              {allergy}
            </span>
          ))}
        </div>
      </SectionCard>

      {/* Current Medications */}
      <SectionCard title="Current Medications" icon={FileText}>
        <div className="space-y-2">
          {userData.health.medications.map((medication, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
            >
              <span className="font-medium">{medication}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );

  const PreferencesSection = () => (
    <div className="space-y-4">
      {/* Notification Preferences */}
      <SectionCard title="Notification Settings" icon={Bell}>
        <div className="space-y-3">
          {Object.entries(userData.preferences.notifications).map(([key, value]) => (
            <div 
              key={key}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
            >
              <span className="capitalize">{key}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  className="sr-only peer"
                  onChange={() => {}}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Account Settings */}
      <SectionCard title="Account Settings" icon={Settings}>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Language</p>
              <p className="text-sm text-gray-500">{userData.preferences.language}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Time Zone</p>
              <p className="text-sm text-gray-500">{userData.preferences.timeZone}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Theme</p>
              <p className="text-sm text-gray-500">{userData.preferences.theme}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </SectionCard>

      {/* Security */}
      <SectionCard title="Security" icon={Shield}>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100">
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-gray-500" />
              <span>Change Password</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100">
            <div className="flex items-center space-x-2">
              <Share2 className="w-5 h-5 text-gray-500" />
              <span>Connected Apps</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </SectionCard>

      {/* Help & Support */}
      <SectionCard title="Help & Support" icon={HelpCircle}>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100">
            <span>Contact Support</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100">
            <span>FAQs</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100">
            <span>Privacy Policy</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </SectionCard>

      {/* Logout Button */}
      <button className="w-full flex items-center justify-center space-x-2 p-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-2xl mx-auto px-4 py-6 flex-1 overflow-y-auto w-full">
        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          <TabButton 
            label="Personal Info" 
            isActive={activeTab === 'personal'}
            onClick={() => setActiveTab('personal')}
          />
          <TabButton 
            label="Health Info" 
            isActive={activeTab === 'health'}
            onClick={() => setActiveTab('health')}
          />
          <TabButton 
            label="Preferences" 
            isActive={activeTab === 'preferences'}
            onClick={() => setActiveTab('preferences')}
          />
        </div>

        {/* Content based on active tab */}
        {activeTab === 'personal' && <PersonalInfoSection />}
        {activeTab === 'health' && <HealthInfoSection />}
        {activeTab === 'preferences' && <PreferencesSection />}
      </div>
      
      <FloatingChat />
    </div>
  );
};

export default ProfilePage;
import React from 'react';
import Navigation from '../../layout/Navigation';
import FloatingChat from '../../shared/FloatingChat';

const EmergencyPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navigation />
      <div className="flex-1 p-4">
        {/* Emergency page content goes here */}
        <h2 className="text-2xl font-semibold mb-4">Emergency Services</h2>
        {/* Add your emergency-specific content */}
      </div>
      <FloatingChat />
    </div>
  );
};

export default EmergencyPage; 
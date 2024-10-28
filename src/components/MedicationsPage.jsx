import React from 'react';
import Navigation from './Navigation';
import FloatingChat from './FloatingChat';

const MedicationsPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navigation />
      <div className="flex-1 p-4">
        {/* Medications page content goes here */}
        <h2 className="text-2xl font-semibold mb-4">Your Medications</h2>
        {/* Add your medications-specific content */}
      </div>
      <FloatingChat />
    </div>
  );
};

export default MedicationsPage;

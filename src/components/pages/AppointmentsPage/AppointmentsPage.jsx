import React from 'react';
import Navigation from '../../layout/Navigation';
import FloatingChat from '../../shared/FloatingChat';

const AppointmentsPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navigation />
      <div className="flex-1 p-4">
        {/* Appointments page content goes here */}
        <h2 className="text-2xl font-semibold mb-4">Your Appointments</h2>
        {/* Add your appointments-specific content */}
      </div>
      <FloatingChat />
    </div>
  );
};

export default AppointmentsPage;
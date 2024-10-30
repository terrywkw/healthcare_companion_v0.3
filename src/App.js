import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import Layout from './components/layout/Layout';

// Pages
import AdvancedHealthHub from './components/pages/AdvancedHealthHub/AdvancedHealthHub';
import VitalsPage from './components/pages/VitalsPage/VitalsPage';
import MedicationsPage from './components/pages/MedicationsPage/MedicationsPage';
import AppointmentsPage from './components/pages/AppointmentsPage/AppointmentsPage';
import MedicalRecordsPage from './components/pages/MedicalRecordsPage/MedicalRecordsPage';
import EmergencyPage from './components/pages/EmergencyPage/EmergencyPage';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';


function App() {
  const basename = process.env.NODE_ENV === 'production' 
    ? '/healthcare_companion_v0.3' 
    : '';

  return (
    <Router basename={basename}>
      <Layout>
        <Routes>
          <Route path="/" element={<AdvancedHealthHub />} />
          <Route path="/vitals" element={<VitalsPage />} />
          <Route path="/medications" element={<MedicationsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/records" element={<MedicalRecordsPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
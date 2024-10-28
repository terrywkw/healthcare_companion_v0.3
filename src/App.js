import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdvancedHealthHub from './components/AdvancedHealthHub';
import VitalsPage from './components/VitalsPage';
import MedicationsPage from './components/MedicationsPage';
import AppointmentsPage from './components/AppointmentsPage';
import EmergencyPage from './components/EmergencyPage';

function App() {
  return (
    <Router>
      <Layout>
      {/* <div className="h-screen"> */}
        <Routes>
          <Route path="/" element={<AdvancedHealthHub />} />
          <Route path="/vitals" element={<VitalsPage />} />
          <Route path="/medications" element={<MedicationsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
        </Routes>
      {/* </div> */}
      </Layout>
    </Router>
  );
}

export default App;
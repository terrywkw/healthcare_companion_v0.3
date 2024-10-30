import React, { useState } from 'react';
import { 
  Pill, Clock, CalendarDays, AlertCircle, Plus, 
  ChevronRight, RefreshCcw, Check, X, Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../../layout/Navigation';
import FloatingChat from '../../shared/FloatingChat';
import AddMedicationModal from '../../shared/AddMedicationModal';
import { ChevronDown, ChevronUp, Stethoscope } from 'lucide-react';


const MedicationsPage = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isDiagnosisExpanded, setIsDiagnosisExpanded] = useState(false);


  // Mock data for medications
  const medications = {
    current: [
      {
        id: 1,
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        timeSlots: ["08:00"],
        nextDose: "08:00",
        refillDate: "2024-11-15",
        adherence: 95,
        type: "tablet",
        instructions: "Take with food",
        status: "active"
      },
      {
        id: 2,
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        timeSlots: ["09:00", "21:00"],
        nextDose: "21:00",
        refillDate: "2024-11-10",
        adherence: 88,
        type: "tablet",
        instructions: "Take with meals",
        status: "active"
      },
      {
        id: 3,
        name: "Aspirin",
        dosage: "81mg",
        frequency: "Once daily",
        timeSlots: ["10:00"],
        nextDose: "10:00",
        refillDate: "2024-12-01",
        adherence: 92,
        type: "tablet",
        instructions: "Take with water",
        status: "active"
      }
    ],
    upcoming: [
      {
        id: 4,
        name: "Metformin",
        time: "21:00",
        dosage: "500mg",
        status: "upcoming"
      },
      {
        id: 5,
        name: "Lisinopril",
        time: "08:00",
        dosage: "10mg",
        status: "upcoming"
      }
    ],
    history: [
      {
        id: 6,
        name: "Lisinopril",
        time: "08:00",
        dosage: "10mg",
        takenAt: "08:05",
        status: "taken"
      },
      {
        id: 7,
        name: "Metformin",
        time: "09:00",
        dosage: "500mg",
        takenAt: "09:15",
        status: "taken"
      }
    ]
  };

  const diagnosisData = [
    {
      condition: "Type 2 Diabetes",
      diagnosedDate: "2023-08-15",
      severity: "Moderate",
      status: "Active",
      treatingDoctor: "Dr. Sarah Johnson"
    },
    {
      condition: "Hypertension",
      diagnosedDate: "2023-05-20",
      severity: "Mild",
      status: "Active",
      treatingDoctor: "Dr. Michael Chen"
    }
  ];
  

  const MedicationCard = ({ medication }) => (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-lg shadow-sm p-4 mb-4"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Pill className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{medication.name}</h3>
            <p className="text-gray-600">{medication.dosage} - {medication.frequency}</p>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>Next: {medication.nextDose}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <CalendarDays className="w-4 h-4 mr-1" />
                <span>Refill: {medication.refillDate}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className={`px-3 py-1 rounded-full text-sm ${
            medication.adherence >= 90 ? 'bg-green-100 text-green-800' :
            medication.adherence >= 80 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {medication.adherence}% Adherence
          </span>
          <button className="mt-2 text-blue-600 hover:text-blue-800">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const UpcomingDose = ({ dose }) => (
    <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm mb-2">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Pill className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p className="font-medium">{dose.name}</p>
          <p className="text-sm text-gray-500">{dose.dosage}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">{dose.time}</span>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600">
            <Check className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

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

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-6 flex-1 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Medications</h1>
            <p className="text-gray-500">Track and manage your medications</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-5 h-5" />
            <span>Add Medication</span>
          </motion.button>
        </div>

        {/* Quick Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-600">Today's Doses</h3>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Pill className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold mt-2">4/6 Taken</p>
            <p className="text-sm text-gray-500 mt-1">2 remaining</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-600">Adherence Rate</h3>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <RefreshCcw className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold mt-2">92%</p>
            <p className="text-sm text-green-600 mt-1">↑ 3% this week</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-600">Refills Needed</h3>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Bell className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <p className="text-2xl font-bold mt-2">2</p>
            <p className="text-sm text-orange-600 mt-1">Within 7 days</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          <TabButton 
            label="Current Medications" 
            isActive={activeTab === 'current'}
            onClick={() => setActiveTab('current')}
          />
          <TabButton 
            label="Upcoming Doses" 
            isActive={activeTab === 'upcoming'}
            onClick={() => setActiveTab('upcoming')}
          />
          <TabButton 
            label="History" 
            isActive={activeTab === 'history'}
            onClick={() => setActiveTab('history')}
          />
        </div>

        {/* Content based on active tab */}
        <div className="space-y-4">
          {activeTab === 'current' && (
            <div>
              {medications.current.map(med => (
                <MedicationCard key={med.id} medication={med} />
              ))}
            </div>
          )}

          {activeTab === 'upcoming' && (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-4">Upcoming Doses</h3>
              {medications.upcoming.map(dose => (
                <UpcomingDose key={dose.id} dose={dose} />
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-4">Medication History</h3>
              {medications.history.map(dose => (
                <div key={dose.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium">{dose.name}</p>
                      <p className="text-sm text-gray-500">{dose.dosage}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Taken at {dose.takenAt}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <FloatingChat />
      
      <AddMedicationModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
};

export default MedicationsPage;
import React, { useState } from 'react';
import { 
  FileText, Calendar, User, Activity, 
  Search, Filter, Download, Pill,
  ChevronRight, AlertCircle, Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import Navigation from '../../layout/Navigation';
import FloatingChat from '../../shared/FloatingChat';

const MedicalRecordsPage = () => {
  const [activeTab, setActiveTab] = useState('diagnoses');
  
  // Mock data
  const medicalData = {
    diagnoses: [
      {
        id: 1,
        condition: "Type 2 Diabetes",
        diagnosedDate: "2023-08-15",
        status: "Active",
        severity: "Moderate",
        treatingPhysician: "Dr. Sarah Johnson",
        lastUpdated: "2024-02-20",
        medications: ["Metformin", "Lisinopril"],
        notes: "Well-controlled with current medication regimen",
        attachments: [
          { id: 1, name: "Lab Results - A1C", date: "2024-02-20" },
          { id: 2, name: "Treatment Plan", date: "2024-02-20" }
        ]
      },
      {
        id: 2,
        condition: "Hypertension",
        diagnosedDate: "2023-10-01",
        status: "Active",
        severity: "Mild",
        treatingPhysician: "Dr. Michael Chen",
        lastUpdated: "2024-03-15",
        medications: ["Lisinopril"],
        notes: "Blood pressure maintaining within target range",
        attachments: [
          { id: 3, name: "BP Monitoring Log", date: "2024-03-15" }
        ]
      }
    ],
    records: [
      {
        id: 1,
        type: "Lab Report",
        date: "2024-02-20",
        provider: "Quest Diagnostics",
        description: "Comprehensive Metabolic Panel",
        category: "Laboratory"
      },
      {
        id: 2,
        type: "Clinical Visit",
        date: "2024-01-15",
        provider: "Dr. Sarah Johnson",
        description: "Quarterly Diabetes Check-up",
        category: "Visit Notes"
      }
    ],
    history: [
      {
        id: 1,
        condition: "Appendicitis",
        date: "2015-06-10",
        treatment: "Appendectomy",
        facility: "Memorial Hospital",
        status: "Resolved"
      }
    ]
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

  const DiagnosisCard = ({ diagnosis }) => (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-lg shadow-sm p-4 mb-4"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold">{diagnosis.condition}</h3>
            <span className={`px-2 py-1 rounded-full text-xs ${
              diagnosis.severity === 'Mild' ? 'bg-green-100 text-green-800' :
              diagnosis.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {diagnosis.severity}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-500">Diagnosed</p>
              <p className="font-medium">{new Date(diagnosis.diagnosedDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="font-medium">{new Date(diagnosis.lastUpdated).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Physician</p>
              <p className="font-medium">{diagnosis.treatingPhysician}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium">{diagnosis.status}</p>
            </div>
          </div>

          {diagnosis.medications.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Related Medications</p>
              <div className="flex flex-wrap gap-2">
                {diagnosis.medications.map((med, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                  >
                    {med}
                  </span>
                ))}
              </div>
            </div>
          )}

          {diagnosis.attachments.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Documents</p>
              <div className="space-y-2">
                {diagnosis.attachments.map(doc => (
                  <div 
                    key={doc.id}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded"
                  >
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm">{doc.name}</span>
                    </div>
                    <button className="text-blue-500 hover:text-blue-600">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  const RecordCard = ({ record }) => (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-lg shadow-sm p-4 mb-4"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold">{record.type}</h3>
            <p className="text-sm text-gray-600">{record.description}</p>
            <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
              <span>{new Date(record.date).toLocaleDateString()}</span>
              <span>•</span>
              <span>{record.provider}</span>
            </div>
          </div>
        </div>
        <button className="text-blue-500 hover:text-blue-600">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-6 flex-1 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
            <p className="text-gray-500">View and manage your health information</p>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Plus className="w-5 h-5" />
              <span>Add Record</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search medical records..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          <TabButton 
            label="Current Diagnoses" 
            isActive={activeTab === 'diagnoses'}
            onClick={() => setActiveTab('diagnoses')}
          />
          <TabButton 
            label="Medical Records" 
            isActive={activeTab === 'records'}
            onClick={() => setActiveTab('records')}
          />
          <TabButton 
            label="Medical History" 
            isActive={activeTab === 'history'}
            onClick={() => setActiveTab('history')}
          />
        </div>

        {/* Content based on active tab */}
        <div>
          {activeTab === 'diagnoses' && (
            <div className="space-y-4">
              {medicalData.diagnoses.map(diagnosis => (
                <DiagnosisCard key={diagnosis.id} diagnosis={diagnosis} />
              ))}
            </div>
          )}

          {activeTab === 'records' && (
            <div className="space-y-4">
              {medicalData.records.map(record => (
                <RecordCard key={record.id} record={record} />
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {medicalData.history.map(item => (
                <div 
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{item.condition}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.treatment}</p>
                      <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{item.facility}</span>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <FloatingChat />
    </div>
  );
};

export default MedicalRecordsPage;
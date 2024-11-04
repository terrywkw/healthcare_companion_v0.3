import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, User, Video, Calendar, Clock, MapPin, 
  ChevronRight, ChevronLeft, Search, Stethoscope, 
  FileText, AlertCircle
} from 'lucide-react';
import CalendarSyncModal from './CalendarSyncModal';
import AppointmentsPage from '../pages/AppointmentsPage/AppointmentsPage';

const ScheduleAppointmentModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [showCalendarSync, setShowCalendarSync] = useState(false);
  const [formData, setFormData] = useState({
    appointmentType: '',
    isVirtual: false,
    provider: '',
    specialty: '',
    date: '',
    time: '',
    reason: '',
    symptoms: '',
    notes: '',
    documents: []
  });

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  // Mock data for providers
  const providers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Endocrinologist",
      availability: "Mon, Wed, Fri",
      image: "/api/placeholder/40/40"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Cardiologist",
      availability: "Tue, Thu",
      image: "/api/placeholder/40/40"
    },
    {
      id: 3,
      name: "Dr. Emily Wilson",
      specialty: "Primary Care",
      availability: "Mon-Fri",
      image: "/api/placeholder/40/40"
    }
  ];

  const appointmentTypes = [
    { id: 'checkup', label: 'Regular Check-up', icon: Stethoscope },
    { id: 'followup', label: 'Follow-up Visit', icon: Calendar },
    { id: 'virtual', label: 'Virtual Consultation', icon: Video },
    { id: 'specialist', label: 'Specialist Consultation', icon: User }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 mb-6">
      {[1, 2, 3].map(num => (
        <div
          key={num}
          className={`w-2.5 h-2.5 rounded-full ${
            step === num ? 'bg-blue-500' : 
            step > num ? 'bg-blue-200' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );

  const ProviderCard = ({ provider, isSelected, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-lg border-2 cursor-pointer ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
          <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-medium">{provider.name}</h4>
          <p className="text-sm text-gray-500">{provider.specialty}</p>
          <p className="text-xs text-gray-400 mt-1">Available: {provider.availability}</p>
        </div>
      </div>
    </motion.div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Appointment Type</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointmentTypes.map(type => (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-lg border-2 ${
                    formData.appointmentType === type.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                  onClick={() => handleInputChange('appointmentType', type.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <type.icon className={`w-8 h-8 mb-2 ${
                      formData.appointmentType === type.id 
                        ? 'text-blue-500' 
                        : 'text-gray-400'
                    }`} />
                    <span className="font-medium">{type.label}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-6 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Reason for Visit
              </label>
              <textarea
                value={formData.reason}
                onChange={(e) => handleInputChange('reason', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Briefly describe your reason for visit"
                rows={3}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Select Provider</h3>
            
            <div className="relative mb-4">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search providers..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-3">
              {providers.map(provider => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  isSelected={formData.provider === provider.id}
                  onClick={() => handleInputChange('provider', provider.id)}
                />
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Schedule & Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Time
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Symptoms (Optional)
              </label>
              <textarea
                value={formData.symptoms}
                onChange={(e) => handleInputChange('symptoms', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe any symptoms you're experiencing"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any additional information for your provider"
                rows={2}
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium flex items-center text-blue-800">
                <AlertCircle className="w-5 h-5 mr-2" />
                Important Note
              </h4>
              <p className="text-sm text-blue-600 mt-1">
                Please arrive 15 minutes before your appointment time. Don't forget to bring any relevant medical records or test results.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-lg my-8"
          onClick={e => e.stopPropagation()}
        >
            <div className="bg-white rounded-xl overflow-hidden shadow-xl">
              {/* Fixed Header */}
              <div className="sticky top-0 z-10 flex justify-between items-center p-4 border-b bg-white">
                <h2 className="text-xl font-semibold">Schedule Appointment</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="p-6">
                    <StepIndicator />
                    {renderStep()}
                  </div>
                </div>

            {/* Fixed Footer */}
            <div className="sticky bottom-0 z-10 flex justify-between items-center p-4 border-t bg-gray-50">
                <button
                  onClick={() => step > 1 && setStep(step - 1)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    step > 1 
                      ? 'text-blue-600 hover:bg-blue-50' 
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={step === 1}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                
              
                <button
                  onClick={() => {
                    if (step < 3) {
                      setStep(step + 1);
                    } else {
                      // Handle form submission
                      console.log(formData);
                      setShowCalendarSync(true);
                    }
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <span>{step === 3 ? 'Schedule' : 'Next'}</span>
                {step < 3 && <ChevronRight className="w-5 h-5" />}
              </button>

              <CalendarSyncModal
                isOpen={showCalendarSync}
                onClose={() => {
                    setShowCalendarSync(false);
                    onClose();
                }}
                appointmentDetails={formData}
                />

                <button 
                className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm hover:bg-green-200"
                onClick={() => setShowCalendarSync(true)}
                >
                <Calendar className="w-4 h-4" />
                <span>Add to Calendar</span>
                </button>

                <CalendarSyncModal
                isOpen={showCalendarSync}
                onClose={() => setShowCalendarSync(false)}
                appointmentDetails={AppointmentsPage}
                />


            </div>
          </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScheduleAppointmentModal;
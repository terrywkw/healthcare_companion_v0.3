import React, { useState } from 'react';
import { 
  Calendar, Clock, User, MapPin, Phone, 
  Plus, ChevronRight, ChevronLeft, Search,
  Video, MessageSquare, AlertCircle, CalendarDays
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../../layout/Navigation';
import FloatingChat from '../../shared/FloatingChat';
import ScheduleAppointmentModal from '../../shared/ScheduleAppointmentModal';
import CalendarSyncModal from '../../shared/CalendarSyncModal';

const AppointmentsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Mock data for appointments
  const appointments = {
    upcoming: [
      {
        id: 1,
        type: "Check-up",
        provider: "Dr. Sarah Johnson",
        specialty: "Endocrinologist",
        date: "2024-11-15",
        time: "10:00 AM",
        location: "Medical Center",
        address: "123 Healthcare Ave",
        isVirtual: false,
        status: "confirmed",
        notes: "Regular diabetes check-up",
        documents: ["Blood test results", "Latest vitals"]
      },
      {
        id: 2,
        type: "Virtual Consultation",
        provider: "Dr. Michael Chen",
        specialty: "Cardiologist",
        date: "2024-11-18",
        time: "2:30 PM",
        isVirtual: true,
        status: "confirmed",
        notes: "Follow-up on blood pressure medication",
        documents: ["BP readings"]
      }
    ],
    past: [
      {
        id: 3,
        type: "Physical Examination",
        provider: "Dr. Emily Wilson",
        specialty: "Primary Care",
        date: "2024-10-20",
        time: "9:00 AM",
        location: "Family Health Clinic",
        address: "456 Medical Blvd",
        isVirtual: false,
        status: "completed",
        notes: "Annual physical examination",
        documents: ["Lab results", "Physical exam report"]
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

  // Updated AppointmentCard component with calendar sync
  const AppointmentCard = ({ appointment }) => {
    const [showCalendarSync, setShowCalendarSync] = useState(false);

    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 overflow-hidden"
      >
      <div className="flex flex-col space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
            appointment.isVirtual ? 'bg-purple-100' : 'bg-blue-100'
          }`}>
              {appointment.isVirtual ? (
              <Video className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            ) : (
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            )}
            </div>
            <div>
              <div className="flex items-center flex-wrap gap-2">
                <h3 className="font-semibold text-base sm:text-lg">{appointment.type}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                  appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  appointment.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </div>
              
              
              
              <div className="space-y-2 mt-2">
                <p className="text-gray-600">{appointment.provider}</p>
                <p className="text-sm text-gray-500">{appointment.specialty}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(appointment.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {appointment.time}
                  </div>
                </div>

                {!appointment.isVirtual && (
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mr-1 mt-1 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">{appointment.location}</p>
                      <p className="text-sm text-gray-500">{appointment.address}</p>
                    </div>
                  </div>
                )}
              </div>

              {appointment.status === 'confirmed' && (
                <div className="flex space-x-2 mt-2">
                  {appointment.isVirtual && (
                    <button className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm hover:bg-purple-200">
                      <Video className="w-4 h-4" />
                      <span>Join Call</span>
                    </button>
                  )}
                  <button className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm hover:bg-blue-200">
                    <MessageSquare className="w-4 h-4" />
                    <span>Message</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm hover:bg-red-200">
                    <AlertCircle className="w-4 h-4" />
                    <span>Reschedule</span>
                  </button>
                  <button 
                    className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm hover:bg-green-200"
                    onClick={() => setShowCalendarSync(true)}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Add to Calendar</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>  
        

        {appointment.documents.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-sm text-gray-500 mb-2">Required Documents</p>
            <div className="flex flex-wrap gap-2">
              {appointment.documents.map((doc, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {doc}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Calendar Sync Modal */}
        <CalendarSyncModal
          isOpen={showCalendarSync}
          onClose={() => setShowCalendarSync(false)}
          appointmentDetails={appointment}
        />
      </motion.div>
    );
  };

  const QuickSchedule = () => (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">Quick Schedule</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Primary Care', 'Specialist', 'Virtual Visit', 'Lab Test'].map((type, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed hover:border-blue-500 hover:bg-blue-50"
            onClick={() => setShowScheduleModal(true)}
          >
            <Plus className="w-6 h-6 text-blue-500 mb-2" />
            <span className="text-sm text-gray-600">{type}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navigation />
      
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6 flex-1 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Appointments</h1>
            <p className="text-sm text-gray-500">Schedule and manage your appointments</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm w-full sm:w-auto"
            onClick={() => setShowScheduleModal(true)}
          >
            <Plus className="w-5 h-5" />
            <span>Schedule Appointment</span>
          </motion.button>
        </div>

        {/* Quick Schedule Section */}
        <QuickSchedule />
        {/* <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-6">
          <h3 className="text-lg font-semibold mb-4">Quick Schedule</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {['Primary Care', 'Specialist', 'Virtual Visit', 'Lab Test'].map((type, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center p-3 rounded-lg border-2 border-dashed hover:border-blue-500 hover:bg-blue-50"
                onClick={() => setShowScheduleModal(true)}
              >
                <Plus className="w-6 h-6 text-blue-500 mb-2" />
                <span className="text-xs sm:text-sm text-gray-600">{type}</span>
              </motion.button>
            ))}
          </div>
        </div> */}

        {/* Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar space-x-2 mb-6">
          {/* Add custom scrolling for tabs on mobile */}
          <style jsx>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
          <TabButton 
            label="Upcoming" 
            isActive={activeTab === 'upcoming'}
            onClick={() => setActiveTab('upcoming')}
          />
          <TabButton 
            label="Past Appointments" 
            isActive={activeTab === 'past'}
            onClick={() => setActiveTab('past')}
          />
          <TabButton 
            label="Calendar View" 
            isActive={activeTab === 'calendar'}
            onClick={() => setActiveTab('calendar')}
          />
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {activeTab === 'upcoming' && appointments.upcoming.map(appointment => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
          
          {activeTab === 'past' && appointments.past.map(appointment => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}

          {activeTab === 'calendar' && (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-4">Calendar View</h3>
              {/* Calendar implementation will go here */}
            </div>
          )}
        </div>
      </div>
      
      <FloatingChat />

      {/* Schedule Appointment Modal */}
      <ScheduleAppointmentModal 
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
      />
    </div>
  );
};

export default AppointmentsPage;
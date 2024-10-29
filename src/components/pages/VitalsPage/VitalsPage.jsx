import React, { useState } from 'react';
import { 
  Activity, PlusCircle, Calendar, ArrowDown, ArrowUp, 
  Heart, Droplets, Scale, Thermometer, Clock, AlertCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import Navigation from '../../layout/Navigation';
import FloatingChat from '../../shared/FloatingChat';


const VitalsPage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('bloodPressure');
  const [isQuickLogOpen, setIsQuickLogOpen] = useState(false);

  // Mock data - would come from API/database
  const mockVitalsData = {
    bloodPressure: { 
      current: "120/80",
      unit: "mmHg",
      status: "normal",
      trend: "stable",
      change: "-2%"
    },
    heartRate: {
      current: "72",
      unit: "bpm",
      status: "normal",
      trend: "improving",
      change: "-5%"
    },
    bloodSugar: {
      current: "95",
      unit: "mg/dL",
      status: "warning",
      trend: "increasing",
      change: "+8%"
    },
    weight: {
      current: "165",
      unit: "lbs",
      status: "normal",
      trend: "stable",
      change: "0%"
    }
  };

  const mockChartData = [
    { date: 'Mon', systolic: 120, diastolic: 80, glucose: 95, weight: 165, heartRate: 72 },
    { date: 'Tue', systolic: 118, diastolic: 79, glucose: 92, weight: 165, heartRate: 74 },
    { date: 'Wed', systolic: 122, diastolic: 82, glucose: 98, weight: 164, heartRate: 71 },
    { date: 'Thu', systolic: 119, diastolic: 80, glucose: 94, weight: 164, heartRate: 73 },
    { date: 'Fri', systolic: 121, diastolic: 81, glucose: 97, weight: 165, heartRate: 72 },
    { date: 'Sat', systolic: 117, diastolic: 78, glucose: 93, weight: 165, heartRate: 70 },
    { date: 'Sun', systolic: 120, diastolic: 80, glucose: 95, weight: 166, heartRate: 72 }
  ];

  const MetricCard = ({ title, icon: Icon, data }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-4 rounded-lg shadow-sm"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5 text-blue-500" />
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${
          data.status === 'normal' ? 'bg-green-100 text-green-800' :
          data.status === 'warning' ? 'bg-orange-100 text-orange-800' :
          'bg-red-100 text-red-800'
        }`}>
          {data.status}
        </span>
      </div>
      <div className="mt-2">
        <div className="flex items-baseline">
          <p className="text-2xl font-bold">{data.current}</p>
          <span className="ml-1 text-sm text-gray-500">{data.unit}</span>
        </div>
        <div className="flex items-center mt-1">
          {data.trend === 'improving' ? (
            <ArrowDown className="w-4 h-4 text-green-500" />
          ) : data.trend === 'increasing' ? (
            <ArrowUp className="w-4 h-4 text-orange-500" />
          ) : (
            <ArrowDown className="w-4 h-4 text-blue-500" />
          )}
          <span className="text-sm text-gray-500 ml-1">{data.change} this week</span>
        </div>
      </div>
    </motion.div>
  );

  const TimeframeButton = ({ label, isActive, onClick }) => (
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

  const QuickLogButton = () => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm"
      onClick={() => setIsQuickLogOpen(true)}
    >
      <PlusCircle className="w-5 h-5" />
      <span>Quick Log</span>
    </motion.button>
  );

  // Quick Log Modal
  const QuickLog = () => (
    isQuickLogOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={() => setIsQuickLogOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl w-full max-w-lg p-6"
          onClick={e => e.stopPropagation()}
        >
          <h2 className="text-xl font-semibold mb-4">Quick Log</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-blue-900 mb-1">Logging vitals</h3>
            <p className="text-blue-800">
              Please enter your latest measurements below.
            </p>
          </div>
          {/* Add form fields */}
        </motion.div>
      </motion.div>
    )
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-6 flex-1 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vitals</h1>
            <p className="text-gray-500">Track and monitor your health metrics</p>
          </div>
          <QuickLogButton />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard 
            title="Blood Pressure" 
            icon={Activity} 
            data={mockVitalsData.bloodPressure}
          />
          <MetricCard 
            title="Heart Rate" 
            icon={Heart} 
            data={mockVitalsData.heartRate}
          />
          <MetricCard 
            title="Blood Sugar" 
            icon={Droplets} 
            data={mockVitalsData.bloodSugar}
          />
          <MetricCard 
            title="Weight" 
            icon={Scale} 
            data={mockVitalsData.weight}
          />
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Trends</h2>
              <p className="text-sm text-gray-500">Track your progress over time</p>
            </div>
            <div className="flex space-x-2">
              <TimeframeButton 
                label="Week" 
                isActive={selectedTimeframe === 'week'}
                onClick={() => setSelectedTimeframe('week')}
              />
              <TimeframeButton 
                label="Month" 
                isActive={selectedTimeframe === 'month'}
                onClick={() => setSelectedTimeframe('month')}
              />
              <TimeframeButton 
                label="Year" 
                isActive={selectedTimeframe === 'year'}
                onClick={() => setSelectedTimeframe('year')}
              />
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="systolic" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="diastolic" 
                  stroke="#93C5FD" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Readings */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Readings</h2>
          <div className="space-y-4">
            {mockChartData.slice(0, 5).map((reading, index) => (
              <div 
                key={index}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {reading.systolic}/{reading.diastolic} mmHg
                    </p>
                    <p className="text-sm text-gray-500">Blood Pressure</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{reading.date}</p>
                    <p className="text-sm text-gray-500">9:00 AM</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Clock className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <FloatingChat />
      <QuickLog />
    </div>
  );
};

export default VitalsPage;
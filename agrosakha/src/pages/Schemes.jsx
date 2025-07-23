import { useState } from 'react';
import { FaHandHoldingUsd, FaShieldAlt, FaVial, FaFileDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Alert from '../components/common/Alert';

const Schemes = ({ darkMode }) => {
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const schemes = [
    {
      id: 'pm_kisan',
      title: 'PM-KISAN Samman Nidhi',
      icon: <FaHandHoldingUsd />,
      description: '₹6,000 annually for small farmers',
      eligibility: 'Small & marginal farmers up to 2 hectares',
      benefits: '₹2,000 per installment, 3 times a year',
      documents: 'Aadhaar, Bank Account, Land Records'
    },
    {
      id: 'crop_insurance',
      title: 'Pradhan Mantri Fasal Bima Yojana',
      icon: <FaShieldAlt />,
      description: 'Crop insurance against natural calamities',
      eligibility: 'All farmers including sharecroppers',
      benefits: 'Up to 100% compensation for crop loss',
      documents: 'Aadhaar, Bank Account, Land Records, Seed Certificate'
    },
    {
      id: 'soil_health',
      title: 'Soil Health Card Scheme',
      icon: <FaVial />,
      description: 'Free soil testing and health cards',
      eligibility: 'All farmers',
      benefits: 'Free soil tests, nutrient recommendations',
      documents: 'Aadhaar, Land Records'
    }
  ];

  const generateForm = (schemeId) => {
    const scheme = schemes.find(s => s.id === schemeId);
    setSelectedScheme(scheme);
    setShowForm(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-800'} border-b-2 ${darkMode ? 'border-green-500' : 'border-green-600'} pb-2 inline-block`}
      >
        📋 Government Schemes
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Alert type="info" icon="info-circle" darkMode={darkMode}>
          <strong>New:</strong> PM-KISAN 14th installment released. Check your beneficiary status.
        </Alert>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, staggerChildren: 0.1 }}
      >
        {schemes.map((scheme) => (
          <motion.div
            key={scheme.id}
            whileHover={{ y: -5 }}
            className={`${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-green-600 to-green-500'} text-white p-6 rounded-xl shadow-lg`}
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="text-2xl">{scheme.icon}</span>
              {scheme.title}
            </h3>
            <div className="space-y-3">
              <p><strong>Description:</strong> {scheme.description}</p>
              <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
              <p><strong>Benefits:</strong> {scheme.benefits}</p>
              <p><strong>Required Documents:</strong> {scheme.documents}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => generateForm(scheme.id)}
              className={`mt-4 px-4 py-2 rounded-lg ${darkMode ? 'bg-white text-gray-800' : 'bg-green-700 text-white'} font-medium flex items-center gap-2`}
            >
              <FaFileDownload />
              Download Form
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {showForm && selectedScheme && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg border-l-4 border-green-500 mt-6`}
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
            <span className={`w-9 h-9 ${darkMode ? 'bg-green-600' : 'bg-green-500'} rounded-lg flex items-center justify-center`}>
              <FaFileDownload className="text-white" />
            </span>
            {selectedScheme.title} Application Form
          </h3>
          <div className="space-y-4">
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-green-50'} p-4 rounded-lg`}>
              <p><strong>Scheme:</strong> {selectedScheme.title}</p>
              <p><strong>Application No:</strong> AGRO-{selectedScheme.id.toUpperCase()}-2025-{Math.floor(1000 + Math.random() * 9000)}</p>
            </div>
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-green-50'} p-4 rounded-lg`}>
              <h4 className="font-semibold mb-2">Please fill in your details:</h4>
              <div className="space-y-3">
                <p>1. Farmer Name: ________________</p>
                <p>2. Aadhaar No: ________________</p>
                {selectedScheme.id === 'pm_kisan' && (
                  <p>3. Bank Account Details: ________________</p>
                )}
                <p>{selectedScheme.id === 'pm_kisan' ? '4' : '3'}. Land Details: ________________</p>
                {selectedScheme.id === 'crop_insurance' && (
                  <p>4. Crop Details: ________________</p>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(false)}
                className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-green-600 hover:bg-green-500' : 'bg-green-500 hover:bg-green-600'} text-white`}
              >
                <FaFileDownload className="inline mr-2" />
                Download PDF
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Schemes;
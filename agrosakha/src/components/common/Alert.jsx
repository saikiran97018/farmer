import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const Alert = ({ type, icon, children, darkMode }) => {
  const alertConfig = {
    success: {
      icon: <FaCheckCircle />,
      bg: darkMode ? 'bg-green-900/50' : 'bg-green-100',
      border: darkMode ? 'border-green-700' : 'border-green-200',
      text: darkMode ? 'text-green-300' : 'text-green-800'
    },
    warning: {
      icon: <FaExclamationTriangle />,
      bg: darkMode ? 'bg-yellow-900/50' : 'bg-yellow-100',
      border: darkMode ? 'border-yellow-700' : 'border-yellow-200',
      text: darkMode ? 'text-yellow-300' : 'text-yellow-800'
    },
    danger: {
      icon: <FaExclamationTriangle />,
      bg: darkMode ? 'bg-red-900/50' : 'bg-red-100',
      border: darkMode ? 'border-red-700' : 'border-red-200',
      text: darkMode ? 'text-red-300' : 'text-red-800'
    },
    info: {
      icon: <FaInfoCircle />,
      bg: darkMode ? 'bg-blue-900/50' : 'bg-blue-100',
      border: darkMode ? 'border-blue-700' : 'border-blue-200',
      text: darkMode ? 'text-blue-300' : 'text-blue-800'
    }
  };

  const config = alertConfig[type] || alertConfig.info;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${config.bg} ${config.border} ${config.text} p-4 rounded-lg border flex items-start gap-3`}
    >
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.5 }}
        className="text-xl"
      >
        {icon === 'check-circle' ? <FaCheckCircle /> : 
         icon === 'exclamation-triangle' ? <FaExclamationTriangle /> : 
         icon === 'info-circle' ? <FaInfoCircle /> : config.icon}
      </motion.div>
      <div className="flex-1">
        {children}
      </div>
    </motion.div>
  );
};

export default Alert;
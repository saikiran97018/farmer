import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, children, darkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -5,
        boxShadow: darkMode 
          ? '0 10px 25px rgba(0, 0, 0, 0.5)' 
          : '0 10px 25px rgba(0, 0, 0, 0.1)'
      }}
      className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-br from-green-50 to-white border-green-100'} 
        p-6 rounded-xl shadow-md border-l-4 border-green-500 transition-all`}
    >
      <motion.h3 
        whileHover={{ x: 5 }}
        className={`text-lg font-bold ${darkMode ? 'text-green-400' : 'text-green-800'} mb-4 flex items-center gap-3`}
      >
        <motion.span 
          whileHover={{ rotate: 10 }}
          className={`w-9 h-9 ${darkMode ? 'bg-green-600' : 'bg-green-500'} rounded-lg flex items-center justify-center`}
        >
          {icon}
        </motion.span>
        {title}
      </motion.h3>
      <div className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {children}
      </div>
    </motion.div>
  );
};

export default FeatureCard;
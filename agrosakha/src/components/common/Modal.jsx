// src/components/common/Modal.jsx
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, children, darkMode }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className={`relative rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 text-2xl ${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-black'
              }`}
            >
              &times;
            </button>
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
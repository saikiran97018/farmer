import { FaSeedling, FaMoon, FaSun } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header
      className={`${
        darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-green-800 to-green-600'
      } text-white py-4 shadow-lg sticky top-0 z-50`}
    >
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          {/* Logo + Title */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${
                darkMode ? 'bg-gray-700' : 'bg-white'
              } w-12 h-12 rounded-xl flex items-center justify-center shadow-md`}
            >
              <FaSeedling
                className={`${
                  darkMode ? 'text-green-400' : 'text-green-600'
                } text-2xl`}
              />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold">Saikiran (AgroSakha)</h1>
              <p
                className={`text-sm opacity-90 ${
                  darkMode ? 'text-gray-300' : 'text-green-100'
                }`}
              >
                AI Farming Assistant for Indian Farmers
              </p>
            </div>
          </div>

          {/* Language + Theme Toggle */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {['Telugu', 'English', 'Hindi'].map((lang, idx) => (
                <button
                  key={idx}
                  className={`${
                    lang === 'English'
                      ? darkMode
                        ? 'bg-gray-600 text-white'
                        : 'bg-white text-green-700'
                      : darkMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-white/15 text-white'
                  } px-3 py-1 rounded-full text-sm font-medium hover:bg-opacity-25 transition-all`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                darkMode
                  ? 'bg-yellow-100 text-gray-900'
                  : 'bg-gray-800 text-yellow-300'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
            </motion.button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-wrap gap-2 justify-center">
          {[
            { path: '/', icon: 'home', label: 'Dashboard' },
            { path: '/weather', icon: 'cloud-sun', label: 'Weather' },
            { path: '/pest', icon: 'bug', label: 'Pest Detection' },
            { path: '/market', icon: 'rupee-sign', label: 'Market Prices' },
            { path: '/schemes', icon: 'file-alt', label: 'Govt Schemes' },
            { path: '/expenses', icon: 'calculator', label: 'Expense Tracker' },
          ].map((tab) => (
            <motion.div key={tab.path} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <NavLink
                to={tab.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all ${
                    isActive
                      ? darkMode
                        ? 'bg-gray-600 text-white shadow-md'
                        : 'bg-white text-green-700 shadow-md'
                      : darkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`
                }
              >
                <span className={`fa fa-${tab.icon}`} />
                {tab.label}
              </NavLink>
            </motion.div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;

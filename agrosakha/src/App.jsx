import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Dashboard from './pages/Dashboard';
import Weather from './pages/Weather';
import Pest from './pages/Pest';
import Market from './pages/Market';
import Schemes from './pages/Schemes';
import Expenses from './pages/Expenses';
import { motion, AnimatePresence } from 'framer-motion';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AnimatedRoutes({ darkMode }) {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-grow container mx-auto px-4 py-6"
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Dashboard darkMode={darkMode} />} />
            <Route path="/weather" element={<Weather darkMode={darkMode} />} />
            <Route path="/pest" element={<Pest darkMode={darkMode} />} />
            <Route path="/market" element={<Market darkMode={darkMode} />} />
            <Route path="/schemes" element={<Schemes darkMode={darkMode} />} />
            <Route path="/expenses" element={<Expenses darkMode={darkMode} />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Detect system preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  // Toggle dark/light mode on body
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    document.body.classList.toggle('light', !darkMode);
    document.body.classList.add('theme-transition');
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-green-50 to-green-100 text-gray-900'}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <AnimatedRoutes darkMode={darkMode} />
        <Footer darkMode={darkMode} />
      </div>
    </Router>
  );
}

export default App;

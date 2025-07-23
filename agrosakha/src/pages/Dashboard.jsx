import { FaCloudSun, FaRupeeSign, FaTractor, FaCalendarAlt } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import Alert from '../components/common/Alert';
import FeatureCard from '../components/common/FeatureCard';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = ({ darkMode }) => {
  const activityData = {
    labels: ['Iron Application', 'Irrigation', 'Weeding', 'Pesticide Spray', 'Harvesting', 'Fertilizers'],
    datasets: [{
      label: 'Days to Complete',
      data: [3, 1, 2, 5, 15, 7],
      backgroundColor: [
        darkMode ? 'rgba(129, 199, 132, 0.7)' : 'rgba(76, 175, 80, 0.7)',
        'rgba(33, 150, 243, 0.7)',
        'rgba(255, 152, 0, 0.7)',
        'rgba(156, 39, 176, 0.7)',
        'rgba(244, 67, 54, 0.7)',
        'rgba(255, 193, 7, 0.7)'
      ],
      borderWidth: 1
    }]
  };

  return (
    <div className="space-y-6 animate-fadeIn text-text">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl font-bold border-b-2 border-primary pb-2 inline-block text-primary"
      >
        🏠 Dashboard
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Alert type="success" icon="check-circle">
          <strong>Hello saikiran!</strong> Your daily farming advice is here.
        </Alert>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, staggerChildren: 0.1 }}
      >
        <FeatureCard
          icon={<FaCloudSun className="text-white" />}
          title="Today's Weather"
          darkMode={darkMode}
        >
          <p><strong>Vijayawada:</strong> 28°C, 75% Humidity</p>
          <p><strong>Conditions:</strong> Partly Cloudy</p>
          <p className="text-primary font-semibold">✅ Suitable for spraying</p>
        </FeatureCard>

        <FeatureCard
          icon={<FaRupeeSign className="text-white" />}
          title="Market Prices"
          darkMode={darkMode}
        >
          <p><strong>Rice:</strong> ₹2,485 / Quintal</p>
          <p><strong>Cotton:</strong> ₹6,742 / Quintal</p>
          <p className="text-primary font-semibold">📈 Prices rising</p>
        </FeatureCard>

        <FeatureCard
          icon={<FaTractor className="text-white" />}
          title="Daily Farming Tip"
          darkMode={darkMode}
        >
          <p><strong>Today:</strong> Ideal day for urea application in paddy crops</p>
          <p><strong>Advice:</strong> Apply between 6–8 AM</p>
        </FeatureCard>

        <FeatureCard
          icon={<FaCalendarAlt className="text-white" />}
          title="Active Schemes"
          darkMode={darkMode}
        >
          <p><strong>PM-KISAN:</strong> Next installment March 2025</p>
          <p><strong>Crop Insurance:</strong> Rates available</p>
          <p className="text-secondary font-semibold">🔔 Apply now</p>
        </FeatureCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-xl font-bold text-primary mb-4">
          📅 This Week's Farming Activities
        </h3>
        <Bar
          data={activityData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              title: {
                display: true,
                text: 'Farming Activity Schedule',
                color: darkMode ? '#FFFFFF' : '#333333'
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { color: darkMode ? '#B0B0B0' : '#757575' },
                grid: { color: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }
              },
              x: {
                ticks: { color: darkMode ? '#B0B0B0' : '#757575' },
                grid: { color: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }
              }
            }
          }}
        />
      </motion.div>
    </div>
  );
};

export default Dashboard;

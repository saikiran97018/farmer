import { useState, useEffect } from 'react';
import { FaRupeeSign, FaStore, FaChartLine, FaChartBar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Alert from '../components/common/Alert';
import { Bar, Line } from 'react-chartjs-2';
import { getChartOptions } from '../utils/chartConfig';

const Market = ({ darkMode }) => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMarketData([
        { crop: 'Rice', price: 2485, trend: 'up', market: 'Vijayawada', change: 2.5 },
        { crop: 'Cotton', price: 6742, trend: 'up', market: 'Guntur', change: 1.8 },
        { crop: 'Pulses', price: 8120, trend: 'stable', market: 'Chilakaluripet', change: 0 },
        { crop: 'Chilies', price: 12500, trend: 'down', market: 'Guntur', change: -3.2 },
        { crop: 'Potato', price: 1850, trend: 'up', market: 'Vijayawada', change: 1.2 },
        { crop: 'Tomato', price: 3200, trend: 'stable', market: 'Chilakaluripet', change: 0.1 }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const priceHistoryData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Rice Price (₹/Quintal)',
        data: [2200, 2250, 2300, 2400, 2450, 2420, 2485],
        borderColor: darkMode ? 'rgba(76, 175, 80, 1)' : 'rgba(46, 125, 50, 1)',
        backgroundColor: darkMode ? 'rgba(76, 175, 80, 0.2)' : 'rgba(46, 125, 50, 0.2)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  const volumeData = {
    labels: ['Rice', 'Cotton', 'Pulses', 'Chilies', 'Potato', 'Tomato'],
    datasets: [{
      label: 'Market Volume (Tons)',
      data: [1200, 850, 600, 400, 750, 500],
      backgroundColor: [
        darkMode ? 'rgba(76, 175, 80, 0.7)' : 'rgba(46, 125, 50, 0.7)',
        'rgba(33, 150, 243, 0.7)',
        'rgba(255, 152, 0, 0.7)',
        'rgba(156, 39, 176, 0.7)',
        'rgba(244, 67, 54, 0.7)',
        'rgba(129, 199, 132, 0.7)'
      ],
      borderWidth: 1
    }]
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-800'} border-b-2 ${darkMode ? 'border-green-500' : 'border-green-600'} pb-2 inline-block`}
      >
        💰 Market Prices
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Alert type="warning" icon="exclamation-triangle" darkMode={darkMode}>
          <strong>Alert:</strong> Rice prices are rising this week. Good time to sell.
        </Alert>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${darkMode ? 'bg-gray-700' : 'bg-green-600'} text-white`}>
                  <tr>
                    <th className="px-4 py-3 text-left">Crop</th>
                    <th className="px-4 py-3 text-left">Price (₹/Quintal)</th>
                    <th className="px-4 py-3 text-left">Trend</th>
                    <th className="px-4 py-3 text-left">Market</th>
                  </tr>
                </thead>
                <tbody>
                  {marketData.map((item, index) => (
                    <tr 
                      key={index} 
                      className={`${index % 2 === 0 ? (darkMode ? 'bg-gray-800/50' : 'bg-green-50') : ''} ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-green-100'}`}
                    >
                      <td className="px-4 py-3">{item.crop}</td>
                      <td className="px-4 py-3 font-medium">₹{item.price.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {item.trend === 'up' ? (
                            <>
                              <FaChartLine className="text-green-500" />
                              <span className="text-green-500 font-medium">↑ {item.change}%</span>
                            </>
                          ) : item.trend === 'down' ? (
                            <>
                              <FaChartLine className="text-red-500 transform rotate-180" />
                              <span className="text-red-500 font-medium">↓ {Math.abs(item.change)}%</span>
                            </>
                          ) : (
                            <>
                              <FaChartLine className="text-yellow-500" />
                              <span className="text-yellow-500 font-medium">→ {item.change}%</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">{item.market}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaChartLine />
              Rice Price Trend (6 Months)
            </h3>
            <Line data={priceHistoryData} options={getChartOptions(darkMode)} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaChartBar />
              Market Volume by Crop
            </h3>
            <Bar data={volumeData} options={getChartOptions(darkMode)} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg border-l-4 border-green-500`}
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-3">
              <span className={`w-9 h-9 ${darkMode ? 'bg-green-600' : 'bg-green-500'} rounded-lg flex items-center justify-center`}>
                <FaStore className="text-white" />
              </span>
              Nearby Markets
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg">Vijayawada Agricultural Market:</h4>
                <div className="ml-4 mt-2 space-y-1">
                  <p><strong>Distance:</strong> 2 km | <strong>Phone:</strong> +91-9876543210</p>
                  <p><strong>Specialties:</strong> Rice, Cotton, Vegetables</p>
                  <p><strong>Hours:</strong> 6:00 AM - 8:00 PM (Mon-Sat)</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Guntur Chili Yard:</h4>
                <div className="ml-4 mt-2 space-y-1">
                  <p><strong>Distance:</strong> 45 km | <strong>Phone:</strong> +91-9876543211</p>
                  <p><strong>Specialties:</strong> Chilies, Turmeric, Cotton</p>
                  <p><strong>Hours:</strong> 5:00 AM - 6:00 PM (Mon-Sat)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Market;
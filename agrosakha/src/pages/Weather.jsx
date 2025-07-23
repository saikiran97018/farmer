import { useState, useEffect } from 'react';
import { FaSearch, FaCloudSun, FaCloudRain, FaSun, FaWind } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Alert from '../components/common/Alert';
import { Bar } from 'react-chartjs-2';
import { getChartOptions } from '../utils/chartConfig';

const Weather = ({ darkMode }) => {
  const [location, setLocation] = useState('Vijayawada');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const getWeather = async () => {
    setLoading(true);
    try {
      // Simulate API call with mock data
      const mockData = {
        current: {
          temp: 28,
          humidity: 75,
          condition: 'Partly cloudy',
          wind_kph: 15,
          precip_mm: 0,
          time: '10:30 AM'
        },
        forecast: [
          { date: '2025-07-21', max_temp: 32, min_temp: 26, condition: 'Sunny', rain: 0 },
          { date: '2025-07-22', max_temp: 33, min_temp: 27, condition: 'Partly cloudy', rain: 0.2 },
          { date: '2025-07-23', max_temp: 31, min_temp: 25, condition: 'Rain', rain: 1.5 }
        ]
      };
      setTimeout(() => {
        setWeatherData(mockData);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  const getWeatherEmoji = (condition) => {
    const lower = condition.toLowerCase();
    if (lower.includes('rain')) return '🌧️';
    if (lower.includes('cloud')) return '⛅';
    if (lower.includes('sun')) return '☀️';
    if (lower.includes('clear')) return '🌤️';
    return '🌡️';
  };

  const chartData = {
    labels: weatherData?.forecast.map(day => new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })) || [],
    datasets: [{
      label: 'Max Temperature (°C)',
      data: weatherData?.forecast.map(day => day.max_temp) || [],
      backgroundColor: darkMode ? 'rgba(76, 175, 80, 0.7)' : 'rgba(46, 125, 50, 0.7)',
      borderColor: darkMode ? 'rgba(76, 175, 80, 1)' : 'rgba(46, 125, 50, 1)',
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
        🌤️ Weather Advisory
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <div className="flex-1 relative">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location (e.g. Vijayawada)"
            className={`w-full pl-4 pr-10 py-3 rounded-xl ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} shadow-md focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500' : 'focus:ring-green-600'}`}
          />
          <FaSearch className="absolute right-3 top-3.5 text-gray-400" />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={getWeather}
          className={`px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white shadow-md`}
        >
          Get Forecast
        </motion.button>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : weatherData ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-green-700 to-green-600'} text-white p-6 rounded-xl shadow-lg`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
              <div className="flex items-center gap-6">
                <div className="text-5xl">
                  {getWeatherEmoji(weatherData.current.condition)}
                </div>
                <div>
                  <div className="text-4xl font-bold">{weatherData.current.temp}°C</div>
                  <div className="text-xl">{location}</div>
                </div>
              </div>
              <div className="text-right">
                <div>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <div>Updated: {weatherData.current.time}</div>
              </div>
            </div>

            <Alert type="info" icon="info-circle" darkMode={darkMode}>
              <strong>Weather Advisory:</strong> {weatherData.current.precip_mm > 0 
                ? `Rain expected (${weatherData.current.precip_mm}mm) - avoid spraying` 
                : weatherData.current.wind_kph > 20 
                ? `High wind speed (${weatherData.current.wind_kph}km/h) - not suitable for spraying` 
                : `Suitable for spraying - low wind and no rain expected`}
            </Alert>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-white/20'} p-4 rounded-lg text-center`}>
                <FaCloudSun className="mx-auto text-2xl mb-2" />
                <div>Humidity</div>
                <div className="font-bold text-xl">{weatherData.current.humidity}%</div>
              </div>
              <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-white/20'} p-4 rounded-lg text-center`}>
                <FaWind className="mx-auto text-2xl mb-2" />
                <div>Wind Speed</div>
                <div className="font-bold text-xl">{weatherData.current.wind_kph} km/h</div>
              </div>
              <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-white/20'} p-4 rounded-lg text-center`}>
                <FaCloudRain className="mx-auto text-2xl mb-2" />
                <div>Rainfall</div>
                <div className="font-bold text-xl">{weatherData.current.precip_mm} mm</div>
              </div>
              <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-white/20'} p-4 rounded-lg text-center`}>
                <FaSun className="mx-auto text-2xl mb-2" />
                <div>Condition</div>
                <div className="font-bold text-xl">{weatherData.current.condition}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}
          >
            <h3 className="text-xl font-bold mb-4">3-Day Forecast</h3>
            <Bar data={chartData} options={getChartOptions(darkMode)} />
          </motion.div>
        </>
      ) : (
        <Alert type="warning" icon="exclamation-triangle" darkMode={darkMode}>
          Failed to load weather data. Please try again.
        </Alert>
      )}
    </div>
  );
};

export default Weather;
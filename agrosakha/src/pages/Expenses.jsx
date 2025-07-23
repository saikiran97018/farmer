import { useState, useEffect } from 'react';
import { FaPlusCircle, FaChartPie, FaRupeeSign, FaArrowUp, FaArrowDown, FaCalendarAlt, FaSeedling } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import { getChartOptions } from '../utils/chartConfig';
import Alert from '../components/common/Alert';

const Expenses = ({ darkMode }) => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    category: '',
    amount: '',
    description: ''
  });

  // Initialize with today's date
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, date: today }));
    
    // Load sample data
    setExpenses([
      { id: 1, date: '2025-07-01', category: 'Seeds', amount: 3500, description: 'Paddy seeds' },
      { id: 2, date: '2025-07-05', category: 'Fertilizers', amount: 8500, description: 'Urea, DAP' },
      { id: 3, date: '2025-07-10', category: 'Pesticides', amount: 4200, description: 'Insecticides' },
      { id: 4, date: '2025-07-15', category: 'Labor', amount: 6000, description: 'Field workers' },
      { id: 5, date: '2025-07-20', category: 'Fuel', amount: 1800, description: 'Tractor diesel' }
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.amount) return;
    
    const newExpense = {
      id: expenses.length + 1,
      date: formData.date,
      category: formData.category,
      amount: parseFloat(formData.amount),
      description: formData.description
    };
    
    setExpenses([...expenses, newExpense]);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: '',
      amount: '',
      description: ''
    });
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const highestCategory = expenses.reduce((max, exp) => 
    exp.amount > (max?.amount || 0) ? exp : max, null)?.category || 'None';

  const expenseData = {
    labels: expenses.map(exp => exp.category),
    datasets: [{
      data: expenses.map(exp => exp.amount),
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
        📊 Expense Tracker
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`${darkMode ? 'bg-gray-800' : 'bg-green-50'} p-6 rounded-xl shadow-lg`}
      >
        <h3 className="text-xl font-bold mb-4">💸 Record Daily Expenses</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Date
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:ring-2 ${darkMode ? 'focus:ring-green-500' : 'focus:ring-green-600'} focus:outline-none`}
                  required
                />
              </div>
            </div>
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:ring-2 ${darkMode ? 'focus:ring-green-500' : 'focus:ring-green-600'} focus:outline-none`}
                required
              >
                <option value="">Select Category</option>
                <option value="Seeds">Seeds</option>
                <option value="Fertilizers">Fertilizers</option>
                <option value="Pesticides">Pesticides</option>
                <option value="Labor">Labor</option>
                <option value="Fuel">Fuel</option>
                <option value="Equipment">Equipment</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Amount (₹)
              </label>
              <div className="relative">
                <FaRupeeSign className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className={`w-full pl-10 pr-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:ring-2 ${darkMode ? 'focus:ring-green-500' : 'focus:ring-green-600'} focus:outline-none`}
                  required
                />
              </div>
            </div>
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="2"
                className={`w-full px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:ring-2 ${darkMode ? 'focus:ring-green-500' : 'focus:ring-green-600'} focus:outline-none`}
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${darkMode ? 'bg-green-600 hover:bg-green-500' : 'bg-green-500 hover:bg-green-600'} text-white shadow-md`}
          >
            <FaPlusCircle />
            Add Expense
          </motion.button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}
      >
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaChartPie />
          Expense Breakdown
        </h3>
        <div className="h-64">
          <Doughnut data={expenseData} options={getChartOptions(darkMode)} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg border-l-4 border-green-500`}
      >
        <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
          <span className={`w-9 h-9 ${darkMode ? 'bg-green-600' : 'bg-green-500'} rounded-lg flex items-center justify-center`}>
            <FaRupeeSign className="text-white" />
          </span>
          Expense Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-gray-700/50' : 'bg-green-50'}`}>
            <h4 className="font-medium mb-2">This Month Total</h4>
            <div className="text-2xl font-bold text-green-500">₹{totalExpenses.toLocaleString('en-IN')}</div>
          </div>
          <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-gray-700/50' : 'bg-green-50'}`}>
            <h4 className="font-medium mb-2">Highest Expense</h4>
            <div className="text-2xl font-bold text-yellow-500">{highestCategory}</div>
          </div>
          <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-gray-700/50' : 'bg-green-50'}`}>
            <h4 className="font-medium mb-2">Estimated Profit</h4>
            <div className="text-2xl font-bold text-blue-500">₹{(totalExpenses * 2.5).toLocaleString('en-IN')}</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${darkMode ? 'bg-gray-700' : 'bg-green-600'} text-white`}>
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr 
                  key={expense.id} 
                  className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-green-50'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  <td className="px-4 py-3">{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {expense.category === 'Seeds' && <FaSeedling className="text-green-500" />}
                      {expense.category}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">₹{expense.amount.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3">{expense.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Expenses;
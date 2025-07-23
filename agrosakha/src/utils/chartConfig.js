export const getChartOptions = (darkMode) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: darkMode ? '#FFFFFF' : '#333333',
      }
    },
    tooltip: {
      backgroundColor: darkMode ? '#333333' : '#FFFFFF',
      titleColor: darkMode ? '#FFFFFF' : '#333333',
      bodyColor: darkMode ? '#FFFFFF' : '#333333',
      borderColor: darkMode ? '#555555' : '#DDDDDD',
    }
  },
  scales: {
    x: {
      ticks: {
        color: darkMode ? '#B0B0B0' : '#757575',
      },
      grid: {
        color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      }
    },
    y: {
      ticks: {
        color: darkMode ? '#B0B0B0' : '#757575',
      },
      grid: {
        color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      }
    }
  }
});

// You can also export other chart-related utilities here
export const getChartColors = (darkMode) => ({
  backgroundColor: darkMode ? 'rgba(76, 175, 80, 0.7)' : 'rgba(46, 125, 50, 0.7)',
  borderColor: darkMode ? 'rgba(76, 175, 80, 1)' : 'rgba(46, 125, 50, 1)',
  pointBackgroundColor: darkMode ? 'rgba(76, 175, 80, 1)' : 'rgba(46, 125, 50, 1)',
});
export const theme = {
  colors: {
    light: {
      primary: '#2E7D32',
      primaryLight: '#4CAF50',
      primaryDark: '#1B5E20',
      secondary: '#FFC107',
      accent: '#2196F3',
      background: '#E8F5E9',
      card: '#FFFFFF',
      text: '#333333',
      textSecondary: '#757575',
      border: '#e0e0e0',
    },
    dark: {
      primary: '#4CAF50',
      primaryLight: '#81C784',
      primaryDark: '#2E7D32',
      secondary: '#FFCA28',
      accent: '#64B5F6',
      background: '#121212',
      card: '#1E1E1E',
      text: '#FFFFFF',
      textSecondary: '#B0B0B0',
      border: '#333333',
    }
  },
  shadows: {
    card: '0 6px 16px rgba(0, 0, 0, 0.1)',
    button: '0 4px 8px rgba(46, 125, 50, 0.3)',
    darkCard: '0 6px 16px rgba(0, 0, 0, 0.3)',
  },
  borderRadius: {
    small: '8px',
    medium: '12px',
    large: '16px',
  },
  transitions: {
    default: 'all 0.3s ease',
    spring: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
  },
  animations: {
    float: 'float 3s ease-in-out infinite',
    fadeIn: 'fadeIn 0.5s ease forwards',
    slideUp: 'slideUp 0.4s ease forwards',
  }
};
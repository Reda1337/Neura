/**
 * Jest setup file for React Native testing
 * Configures testing environment and mocks for components
 */

import 'react-native-gesture-handler/jestSetup';

// Import custom matchers for enhanced testing
import './src/components/shared/test.utils';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock Expo modules if needed
jest.mock('expo-font');
jest.mock('expo-asset');

// Mock the theme provider context
const mockTheme = {
  colors: {
    primary: {
      main: '#6750A4',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#625B71',
      contrast: '#FFFFFF',
    },
    success: {
      main: '#4CAF50',
      contrast: '#FFFFFF',
    },
    error: {
      main: '#F44336',
      contrast: '#FFFFFF',
    },
    warning: {
      main: '#FF9800',
      contrast: '#000000',
    },
    golden: {
      main: '#FFD700',
      contrast: '#000000',
    },
    surface: {
      main: '#FFFBFE',
      variant: '#E7E0EC',
      disabled: '#F5F5F5',
    },
    text: {
      primary: '#1C1B1F',
      secondary: '#49454F',
      disabled: '#C4C7C5',
      inverse: '#FFFFFF',
    },
    border: {
      main: '#79747E',
      disabled: '#C4C7C5',
    },
  },
  spacing: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
  },
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
  typography: {
    displayLarge: {
      fontSize: 57,
      lineHeight: 64,
      fontWeight: '400',
    },
    headlineMedium: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: '400',
    },
    titleLarge: {
      fontSize: 22,
      lineHeight: 28,
      fontWeight: '400',
    },
    titleMedium: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '500',
    },
    bodyLarge: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400',
    },
    bodyMedium: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400',
    },
    labelLarge: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '500',
    },
    labelMedium: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '500',
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '400',
    },
  },
};

// Mock the useTheme hook
jest.mock('./src/providers/ThemeProvider', () => ({
  useTheme: () => ({ theme: mockTheme }),
  ThemeProvider: ({ children }) => children,
}));

// Setup global test utilities
global.mockTheme = mockTheme;
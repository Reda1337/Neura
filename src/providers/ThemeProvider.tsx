/**
 * Theme Provider and Context for managing app themes
 * Provides theme switching capabilities and theme access throughout the app
 */

import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ColorScheme, Theme, themes } from '../theme';

// Theme context interface
interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme | 'auto') => void;
  toggleColorScheme: () => void;
  isDark: boolean;
  isLight: boolean;
}

// Create theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode;
  initialColorScheme?: ColorScheme | 'auto';
  forcedTheme?: Theme; // For testing or custom themes
}

// Theme provider component
export function ThemeProvider({ 
  children, 
  initialColorScheme = 'auto',
  forcedTheme 
}: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const [userColorScheme, setUserColorScheme] = useState<ColorScheme | 'auto'>(initialColorScheme);
  
  // Determine the active color scheme
  const activeColorScheme: ColorScheme = userColorScheme === 'auto' 
    ? (systemColorScheme === 'dark' ? 'dark' : 'light')
    : userColorScheme;
  
  // Get the current theme
  const currentTheme = forcedTheme || themes[activeColorScheme];
  
  // Set color scheme handler
  const setColorScheme = useCallback((scheme: ColorScheme | 'auto') => {
    setUserColorScheme(scheme);
  }, []);
  
  // Toggle between light and dark
  const toggleColorScheme = useCallback(() => {
    if (userColorScheme === 'auto') {
      // If auto, switch to the opposite of system
      setUserColorScheme(systemColorScheme === 'dark' ? 'light' : 'dark');
    } else {
      // If manual, toggle between light and dark
      setUserColorScheme(activeColorScheme === 'light' ? 'dark' : 'light');
    }
  }, [userColorScheme, systemColorScheme, activeColorScheme]);
  
  // Context value
  const contextValue: ThemeContextType = {
    theme: currentTheme,
    colorScheme: activeColorScheme,
    setColorScheme,
    toggleColorScheme,
    isDark: activeColorScheme === 'dark',
    isLight: activeColorScheme === 'light',
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme context
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

// Hook to get theme object directly (for convenience)
export function useThemeTokens(): Theme {
  return useTheme().theme;
}

// Hook to get color scheme utilities
export function useColorSchemeUtils() {
  const { colorScheme, setColorScheme, toggleColorScheme, isDark, isLight } = useTheme();
  
  return {
    colorScheme,
    setColorScheme,
    toggleColorScheme,
    isDark,
    isLight,
    setLight: () => setColorScheme('light'),
    setDark: () => setColorScheme('dark'),
    setAuto: () => setColorScheme('auto'),
  };
}

// Export the context for advanced usage
export { ThemeContext };

/**
 * Integration Tests
 * 
 * Basic tests to ensure components work together properly
 */

import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { View } from 'react-native';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { ThemedButton } from '../ThemedButton';
import { ThemedText } from '../ThemedText';

describe('Component Integration', () => {
  it('should render multiple components together', () => {
    render(
      <ThemeProvider>
        <View>
          <ThemedText testID="header">Welcome</ThemedText>
          <ThemedButton testID="button" onPress={() => {}}>
            Click Me
          </ThemedButton>
        </View>
      </ThemeProvider>
    );

    expect(screen.getByTestId('header')).toHaveTextContent('Welcome');
    expect(screen.getByTestId('button')).toHaveTextContent('Click Me');
  });

  it('should handle user interactions', () => {
    const mockPress = jest.fn();
    
    render(
      <ThemeProvider>
        <ThemedButton testID="interactive-button" onPress={mockPress}>
          Interactive Button
        </ThemedButton>
      </ThemeProvider>
    );

    const button = screen.getByTestId('interactive-button');
    fireEvent.press(button);
    
    expect(mockPress).toHaveBeenCalledTimes(1);
  });

  it('should maintain accessibility', () => {
    render(
      <ThemeProvider>
        <View>
          <ThemedButton 
            testID="accessible-button" 
            onPress={() => {}}
            accessibilityLabel="Test button"
          >
            Button
          </ThemedButton>
          <ThemedText testID="accessible-text">Text</ThemedText>
        </View>
      </ThemeProvider>
    );

    const button = screen.getByTestId('accessible-button');
    const text = screen.getByTestId('accessible-text');

    expect(button).toBeAccessible();
    expect(text).toBeAccessible();
  });
});
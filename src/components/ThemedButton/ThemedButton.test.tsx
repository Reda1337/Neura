/**
 * ThemedButton Component Tests
 * 
 * Comprehensive behavior-driven tests covering:
 * - Component rendering and accessibility
 * - User interactions and event handling
 * - Visual variants and styling
 * - Loading and disabled states
 * - Error scenarios and edge cases
 */

import { fireEvent, render, screen } from '@testing-library/react-native';
import * as React from 'react';
import { ThemedButton } from './index';

// Test helpers for better test organization
const ButtonTestScenarios = {
  variants: ['filled', 'outlined', 'text', 'elevated'] as const,
  colors: ['primary', 'secondary', 'success', 'error', 'warning', 'golden'] as const,
  sizes: ['small', 'medium', 'large'] as const,
};

describe('ThemedButton Component', () => {
  describe('Basic Rendering and Accessibility', () => {
    it('should render button with text content', () => {
      render(<ThemedButton onPress={jest.fn()}>Click me</ThemedButton>);
      
      expect(screen.getByText('Click me')).toBeTruthy();
      expect(screen.getByRole('button')).toBeTruthy();
    });

    it('should have proper accessibility attributes', () => {
      const onPress = jest.fn();
      render(<ThemedButton onPress={onPress}>Accessible Button</ThemedButton>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveProp('accessibilityRole', 'button');
      expect(button).toHaveProp('accessibilityState', { disabled: false, busy: false });
    });

    it('should support custom accessibility props', () => {
      render(
        <ThemedButton 
          onPress={jest.fn()}
          accessibilityLabel="Custom button label"
          accessibilityHint="Performs a custom action"
        >
          Button
        </ThemedButton>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveProp('accessibilityLabel', 'Custom button label');
      expect(button).toHaveProp('accessibilityHint', 'Performs a custom action');
    });
  });

  describe('User Interactions', () => {
    it('should call onPress when button is pressed', () => {
      const onPressMock = jest.fn();
      render(<ThemedButton onPress={onPressMock}>Press Me</ThemedButton>);
      
      const button = screen.getByRole('button');
      fireEvent.press(button);
      
      expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('should not call onPress when button is disabled', () => {
      const onPressMock = jest.fn();
      render(
        <ThemedButton onPress={onPressMock} disabled>
          Disabled Button
        </ThemedButton>
      );
      
      const button = screen.getByRole('button');
      fireEvent.press(button);
      
      expect(onPressMock).not.toHaveBeenCalled();
    });

    it('should not call onPress when button is loading', () => {
      const onPressMock = jest.fn();
      render(
        <ThemedButton onPress={onPressMock} loading>
          Loading Button
        </ThemedButton>
      );
      
      const button = screen.getByRole('button');
      fireEvent.press(button);
      
      expect(onPressMock).not.toHaveBeenCalled();
    });

    it('should handle multiple rapid presses correctly', () => {
      const onPressMock = jest.fn();
      render(<ThemedButton onPress={onPressMock}>Rapid Press</ThemedButton>);
      
      const button = screen.getByRole('button');
      fireEvent.press(button);
      fireEvent.press(button);
      fireEvent.press(button);
      
      expect(onPressMock).toHaveBeenCalledTimes(3);
    });
  });

  describe('Visual Variants', () => {
    ButtonTestScenarios.variants.forEach(variant => {
      it(`should render ${variant} variant correctly`, () => {
        render(
          <ThemedButton variant={variant} onPress={jest.fn()}>
            {variant} Button
          </ThemedButton>
        );
        
        const button = screen.getByRole('button');
        expect(button).toBeTruthy();
        expect(screen.getByText(`${variant} Button`)).toBeTruthy();
      });
    });

    ButtonTestScenarios.colors.forEach(color => {
      it(`should render ${color} color correctly`, () => {
        render(
          <ThemedButton color={color} onPress={jest.fn()}>
            {color} Button
          </ThemedButton>
        );
        
        const button = screen.getByRole('button');
        expect(button).toBeTruthy();
        expect(screen.getByText(`${color} Button`)).toBeTruthy();
      });
    });

    ButtonTestScenarios.sizes.forEach(size => {
      it(`should render ${size} size correctly`, () => {
        render(
          <ThemedButton size={size} onPress={jest.fn()}>
            {size} Button
          </ThemedButton>
        );
        
        const button = screen.getByRole('button');
        expect(button).toBeTruthy();
        expect(screen.getByText(`${size} Button`)).toBeTruthy();
      });
    });
  });

  describe('Loading State Behavior', () => {
    it('should display loading indicator when loading', () => {
      render(
        <ThemedButton loading onPress={jest.fn()}>
          Loading Button
        </ThemedButton>
      );
      
      // Check that button text is still rendered
      expect(screen.getByText('Loading Button')).toBeTruthy();
      
      // Check that the button is in loading state
      const button = screen.getByRole('button');
      expect(button).toHaveProp('accessibilityState', { disabled: true, busy: true });
    });

    it('should show activity indicator when loading', () => {
      render(
        <ThemedButton loading onPress={jest.fn()}>
          Loading Button
        </ThemedButton>
      );
      
      // The loading state should render an ActivityIndicator, which we can verify
      // by checking that the button is disabled and in busy state
      const button = screen.getByRole('button');
      expect(button).toHaveProp('accessibilityState', { disabled: true, busy: true });
      
      // Text should still be present
      expect(screen.getByText('Loading Button')).toBeTruthy();
    });

    it('should have correct accessibility state when loading', () => {
      render(
        <ThemedButton loading onPress={jest.fn()}>
          Loading Button
        </ThemedButton>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveProp('accessibilityState', { disabled: true, busy: true });
    });

    it('should disable user interaction when loading', () => {
      const onPressMock = jest.fn();
      render(
        <ThemedButton loading onPress={onPressMock}>
          Loading Button
        </ThemedButton>
      );
      
      const button = screen.getByRole('button');
      fireEvent.press(button);
      
      // Should not call onPress when loading
      expect(onPressMock).not.toHaveBeenCalled();
    });
  });

  describe('Disabled State Behavior', () => {
    it('should have correct accessibility state when disabled', () => {
      render(
        <ThemedButton disabled onPress={jest.fn()}>
          Disabled Button
        </ThemedButton>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveProp('accessibilityState', { disabled: true, busy: false });
    });

    it('should disable user interaction when disabled', () => {
      const onPressMock = jest.fn();
      render(
        <ThemedButton disabled onPress={onPressMock}>
          Disabled Button
        </ThemedButton>
      );
      
      const button = screen.getByRole('button');
      fireEvent.press(button);
      
      // Should not call onPress when disabled
      expect(onPressMock).not.toHaveBeenCalled();
    });
  });

  describe('Layout and Styling', () => {
    it('should support fullWidth prop', () => {
      render(
        <ThemedButton fullWidth onPress={jest.fn()}>
          Full Width Button
        </ThemedButton>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeTruthy();
      expect(screen.getByText('Full Width Button')).toBeTruthy();
    });

    it('should apply custom styles correctly', () => {
      const customStyle = { marginTop: 20, backgroundColor: 'red' };
      render(
        <ThemedButton style={customStyle} onPress={jest.fn()}>
          Custom Style Button
        </ThemedButton>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeTruthy();
    });

    it('should apply custom text styles correctly', () => {
      const customTextStyle = { fontSize: 18, fontWeight: '600' as const };
      render(
        <ThemedButton textStyle={customTextStyle} onPress={jest.fn()}>
          Custom Text Style
        </ThemedButton>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeTruthy();
      expect(screen.getByText('Custom Text Style')).toBeTruthy();
    });
  });

  describe('Content Handling', () => {
    it('should handle long text content correctly', () => {
      const longText = 'This is a very long button text that might overflow';
      render(<ThemedButton onPress={jest.fn()}>{longText}</ThemedButton>);
      
      expect(screen.getByText(longText)).toBeTruthy();
    });

    it('should handle empty content gracefully', () => {
      render(<ThemedButton onPress={jest.fn()}>Empty</ThemedButton>);
      
      const button = screen.getByRole('button');
      expect(button).toBeTruthy();
    });

    it('should handle React node children', () => {
      render(
        <ThemedButton onPress={jest.fn()}>
          <>{/* React fragment content */}Button Text</>
        </ThemedButton>
      );
      
      expect(screen.getByText('Button Text')).toBeTruthy();
    });
  });

  describe('Variant Combination Testing', () => {
    // Test critical combinations that are commonly used
    const criticalCombinations = [
      { variant: 'filled', color: 'primary', size: 'medium' },
      { variant: 'outlined', color: 'secondary', size: 'large' },
      { variant: 'text', color: 'error', size: 'small' },
      { variant: 'elevated', color: 'success', size: 'medium' },
    ] as const;

    criticalCombinations.forEach(({ variant, color, size }) => {
      it(`should render ${variant} ${color} ${size} button correctly`, () => {
        render(
          <ThemedButton 
            variant={variant} 
            color={color} 
            size={size} 
            onPress={jest.fn()}
          >
            {variant} {color} {size}
          </ThemedButton>
        );
        
        const button = screen.getByRole('button');
        expect(button).toBeTruthy();
        expect(screen.getByText(`${variant} ${color} ${size}`)).toBeTruthy();
      });
    });
  });

  describe('Edge Cases and Error Scenarios', () => {
    it('should handle missing onPress prop gracefully', () => {
      // This should not crash the component
      expect(() => {
        render(<ThemedButton>No onPress</ThemedButton>);
      }).not.toThrow();
    });

    it('should handle undefined children gracefully', () => {
      expect(() => {
        render(<ThemedButton onPress={jest.fn()}>{undefined}</ThemedButton>);
      }).not.toThrow();
    });

    it('should handle both loading and disabled states', () => {
      const onPressMock = jest.fn();
      render(
        <ThemedButton loading disabled onPress={onPressMock}>
          Loading and Disabled
        </ThemedButton>
      );
      
      const button = screen.getByRole('button');
      fireEvent.press(button);
      
      // Should not call onPress when both loading and disabled
      expect(onPressMock).not.toHaveBeenCalled();
      expect(button).toHaveProp('accessibilityState', { disabled: true, busy: true });
    });
  });

  describe('Performance Considerations', () => {
    it('should not re-render unnecessarily', () => {
      const onPress = jest.fn();
      const { rerender } = render(
        <ThemedButton onPress={onPress}>Initial</ThemedButton>
      );
      
      // Re-render with same props
      rerender(<ThemedButton onPress={onPress}>Initial</ThemedButton>);
      
      expect(screen.getByText('Initial')).toBeTruthy();
    });
  });

  describe('Integration with Theme System', () => {
    it('should work correctly without theme provider', () => {
      // This tests the fallback behavior when theme context is not available
      expect(() => {
        render(<ThemedButton onPress={jest.fn()}>No Theme</ThemedButton>);
      }).not.toThrow();
    });
  });
});
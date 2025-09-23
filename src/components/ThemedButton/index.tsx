/**
 * ThemedButton Component
 * 
 * A comprehensive button component that provides Material Design 3 button variants
 * with theme-aware styling, loading states, and accessibility features.
 * 
 * @example
 * // Basic usage
 * <ThemedButton onPress={handlePress}>Click me</ThemedButton>
 * 
 * // Different variants
 * <ThemedButton variant="filled" color="primary" onPress={handlePress}>
 *   Primary Action
 * </ThemedButton>
 * 
 * // With loading state
 * <ThemedButton loading onPress={handleSubmit}>
 *   Submit
 * </ThemedButton>
 * 
 * // Disabled state
 * <ThemedButton disabled onPress={handlePress}>
 *   Cannot click
 * </ThemedButton>
 */

import * as React from 'react';
import {
  ActivityIndicator,
  Platform,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../providers/ThemeProvider';
import { Theme } from '../../theme';

export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'elevated';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'golden';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ThemedButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  /** Button visual variant */
  variant?: ButtonVariant;
  /** Button color scheme */
  color?: ButtonColor;
  /** Button size */
  size?: ButtonSize;
  /** Button content */
  children: React.ReactNode;
  /** Loading state - shows spinner and disables interaction */
  loading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Custom button container style */
  style?: ViewStyle;
  /** Custom text style */
  textStyle?: TextStyle;
}

/**
 * ThemedButton component with Material Design 3 variants and states
 */
export function ThemedButton({
  variant = 'filled',
  color = 'primary',
  size = 'medium',
  children,
  loading = false,
  fullWidth = false,
  disabled = false,
  style,
  textStyle,
  onPress,
  ...rest
}: ThemedButtonProps) {
  const { theme } = useTheme();

  const isDisabled = disabled || loading;
  const buttonStyles = getButtonStyles(variant, color, size, isDisabled, fullWidth, theme);
  const textStyles = getTextStyles(variant, color, size, isDisabled, theme);

  const handlePress = (event: any) => {
    if (!isDisabled && onPress) {
      onPress(event);
    }
  };

  return (
    <TouchableOpacity
      style={[buttonStyles, style]}
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={isDisabled ? 1 : 0.7}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      {...rest}
    >
      <View style={styles.content}>
        {loading && (
          <ActivityIndicator
            size="small"
            color={getSpinnerColor(variant, color, theme)}
            style={styles.spinner}
          />
        )}
        <Text style={[textStyles, textStyle]} numberOfLines={1}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

/**
 * Get color object based on button color prop
 */
function getButtonColor(color: ButtonColor, theme: Theme) {
  switch (color) {
    case 'primary':
      return theme.colors.primary;
    case 'secondary':
      return theme.colors.secondary;
    case 'success':
      return theme.colors.success;
    case 'error':
      return theme.colors.error;
    case 'warning':
      return theme.colors.warning;
    case 'golden':
      return theme.colors.golden;
    default:
      return theme.colors.primary;
  }
}

/**
 * Generate button container styles based on variant, color, and state
 */
function getButtonStyles(
  variant: ButtonVariant,
  color: ButtonColor,
  size: ButtonSize,
  disabled: boolean,
  fullWidth: boolean,
  theme: Theme
): ViewStyle {
  const baseStyle: ViewStyle = {
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...getSizeStyles(size, theme),
    ...(fullWidth && { width: '100%' }),
  };

  if (disabled) {
    return {
      ...baseStyle,
      backgroundColor: theme.colors.surface.disabled,
      borderColor: theme.colors.border.disabled,
      borderWidth: variant === 'outlined' ? 1 : 0,
      opacity: 0.6,
    };
  }

  const buttonColor = getButtonColor(color, theme);

  switch (variant) {
    case 'filled':
      return {
        ...baseStyle,
        backgroundColor: buttonColor.main,
      };

    case 'outlined':
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
        borderColor: buttonColor.main,
        borderWidth: 1,
      };

    case 'text':
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
      };

    case 'elevated':
      return {
        ...baseStyle,
        backgroundColor: theme.colors.surface.variant,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      };

    default:
      return baseStyle;
  }
}

/**
 * Generate text styles based on variant, color, and state
 */
function getTextStyles(
  variant: ButtonVariant,
  color: ButtonColor,
  size: ButtonSize,
  disabled: boolean,
  theme: Theme
): TextStyle {
  const baseStyle: TextStyle = {
    fontWeight: '600',
    textAlign: 'center',
    ...getTextSizeStyles(size, theme),
  };

  if (disabled) {
    return {
      ...baseStyle,
      color: theme.colors.text.disabled,
    };
  }

  const buttonColor = getButtonColor(color, theme);

  switch (variant) {
    case 'filled':
    case 'elevated':
      return {
        ...baseStyle,
        color: buttonColor.contrast,
      };

    case 'outlined':
    case 'text':
      return {
        ...baseStyle,
        color: buttonColor.main,
      };

    default:
      return baseStyle;
  }
}

/**
 * Get size-specific styles for button container
 */
function getSizeStyles(size: ButtonSize, theme: Theme): ViewStyle {
  // Platform-specific minimum heights (iOS: 44pt, Android: 48dp)
  const iosBase = 44;
  const androidBase = 48;
  
  switch (size) {
    case 'small':
      return {
        paddingHorizontal: theme.spacing[4],
        paddingVertical: theme.spacing[2],
        minHeight: Platform.OS === 'ios' ? iosBase - 8 : androidBase - 8, // 36/40
      };

    case 'medium':
      return {
        paddingHorizontal: theme.spacing[6],
        paddingVertical: theme.spacing[3],
        minHeight: Platform.OS === 'ios' ? iosBase : androidBase, // 44/48
      };

    case 'large':
      return {
        paddingHorizontal: theme.spacing[8],
        paddingVertical: theme.spacing[4],
        minHeight: Platform.OS === 'ios' ? iosBase + 8 : androidBase + 8, // 52/56
      };

    default:
      return {};
  }
}

/**
 * Get size-specific styles for button text
 */
function getTextSizeStyles(size: ButtonSize, theme: Theme): TextStyle {
  switch (size) {
    case 'small':
      return {
        fontSize: theme.typography.labelMedium.fontSize,
        lineHeight: theme.typography.labelMedium.lineHeight,
      };

    case 'medium':
      return {
        fontSize: theme.typography.labelLarge.fontSize,
        lineHeight: theme.typography.labelLarge.lineHeight,
      };

    case 'large':
      return {
        fontSize: theme.typography.titleMedium.fontSize,
        lineHeight: theme.typography.titleMedium.lineHeight,
      };

    default:
      return {};
  }
}

/**
 * Get spinner color based on button variant and color
 */
function getSpinnerColor(variant: ButtonVariant, color: ButtonColor, theme: Theme): string {
  const buttonColor = getButtonColor(color, theme);
  
  switch (variant) {
    case 'filled':
    case 'elevated':
      return buttonColor.contrast;

    case 'outlined':
    case 'text':
      return buttonColor.main;

    default:
      return theme.colors.text.primary;
  }
}

/**
 * Internal styles for component layout
 */
const styles = {
  content: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  spinner: {
    marginRight: 8,
  },
};
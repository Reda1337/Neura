/**
 * ThemedText Component
 * 
 * A comprehensive text component that provides typography variants and theme-aware styling
 * following Material Design 3 typography scale.
 * 
 * @example
 * // Basic usage
 * <ThemedText variant="headlineMedium">Welcome</ThemedText>
 * 
 * // With custom color
 * <ThemedText variant="bodyLarge" color="secondary">Description text</ThemedText>
 * 
 * // Using pre-configured components
 * <DisplayText>Large heading</DisplayText>
 * <BodyText>Regular paragraph text</BodyText>
 */

import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { useTheme } from '../../providers/ThemeProvider';
import { Theme, TypographyVariant } from '../../theme';

export interface ThemedTextProps extends RNTextProps {
  /** Typography variant following Material Design 3 scale */
  variant?: TypographyVariant;
  /** Text color - accepts theme color keys or custom color values */
  color?: 'primary' | 'secondary' | 'disabled' | 'inverse' | string;
  /** Content to display */
  children: React.ReactNode;
}

/**
 * Main ThemedText component with full customization options
 */
export function ThemedText({ 
  variant = 'bodyMedium', 
  color = 'primary',
  style,
  children,
  ...rest 
}: ThemedTextProps) {
  const { theme } = useTheme();
  
  const typographyStyle = theme.typography[variant];
  const textColor = getTextColor(color, theme);
  
  const textStyle = {
    ...typographyStyle,
    color: textColor,
  };

  return (
    <RNText style={[textStyle, style]} {...rest}>
      {children}
    </RNText>
  );
}

/**
 * Helper function to resolve text color from theme or custom value
 */
function getTextColor(color: string, theme: Theme): string {
  const colorMap: Record<string, string> = {
    primary: theme.colors.text.primary,
    secondary: theme.colors.text.secondary,
    disabled: theme.colors.text.disabled,
    inverse: theme.colors.text.inverse,
  };

  return colorMap[color] || color;
}

// Pre-configured text components for common use cases
type PreConfiguredTextProps = Omit<ThemedTextProps, 'variant'>;

/**
 * Display text component - largest text for headlines and hero content
 */
export function DisplayText({ children, ...props }: PreConfiguredTextProps) {
  return <ThemedText variant="displayLarge" {...props}>{children}</ThemedText>;
}

/**
 * Headline text component - high emphasis text for section headers
 */
export function HeadlineText({ children, ...props }: PreConfiguredTextProps) {
  return <ThemedText variant="headlineMedium" {...props}>{children}</ThemedText>;
}

/**
 * Title text component - medium emphasis text for subsection headers
 */
export function TitleText({ children, ...props }: PreConfiguredTextProps) {
  return <ThemedText variant="titleLarge" {...props}>{children}</ThemedText>;
}

/**
 * Body text component - readable text for main content
 */
export function BodyText({ children, ...props }: PreConfiguredTextProps) {
  return <ThemedText variant="bodyLarge" {...props}>{children}</ThemedText>;
}

/**
 * Caption text component - smaller text for secondary information
 */
export function CaptionText({ children, ...props }: PreConfiguredTextProps) {
  return <ThemedText variant="caption" {...props}>{children}</ThemedText>;
}

/**
 * Label text component - text for UI elements and labels
 */
export function LabelText({ children, ...props }: PreConfiguredTextProps) {
  return <ThemedText variant="labelMedium" {...props}>{children}</ThemedText>;
}
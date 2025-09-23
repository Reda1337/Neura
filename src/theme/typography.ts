/**
 * Typography system based on Material Design typography scale
 * Each variant includes complete style objects for consistent usage
 */

import { Platform } from 'react-native';

// Font family configuration
const fontFamily = {
  regular: Platform.select({
    ios: 'SF Pro Text',
    android: 'Roboto',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'SF Pro Text',
    android: 'Roboto-Medium',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'SF Pro Text',
    android: 'Roboto-Bold',
    default: 'System',
  }),
  light: Platform.select({
    ios: 'SF Pro Text',
    android: 'Roboto-Light',
    default: 'System',
  }),
} as const;

// Font weights - platform specific values
const fontWeight = {
  light: Platform.select({
    ios: '300',
    android: '300',
    default: '300',
  }) as '300',
  regular: Platform.select({
    ios: '400',
    android: '400', 
    default: '400',
  }) as '400',
  medium: Platform.select({
    ios: '500',
    android: '500',
    default: '500',
  }) as '500',
  semiBold: Platform.select({
    ios: '600',
    android: '600',
    default: '600',
  }) as '600',
  bold: Platform.select({
    ios: '700',
    android: '700',
    default: '700',
  }) as '700',
} as const;

// Typography variants following Material Design 3 scale
export const typography = {
  // Display styles - largest text
  displayLarge: {
    fontFamily: fontFamily.regular,
    fontWeight: fontWeight.bold,
    fontSize: 57,
    lineHeight: 64,
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontFamily: fontFamily.regular,
    fontWeight: fontWeight.semiBold,
    fontSize: 45,
    lineHeight: 52,
    letterSpacing: 0,
  },
  displaySmall: {
    fontFamily: fontFamily.regular,
    fontWeight: fontWeight.medium,
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: 0,
  },

  // Headline styles - high emphasis
  headlineLarge: {
    fontFamily: fontFamily.regular,
    fontWeight: fontWeight.semiBold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
  },
  headlineMedium: {
    fontFamily: fontFamily.regular,
    fontWeight: fontWeight.medium,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
  },
  headlineSmall: {
    fontFamily: fontFamily.regular,
    fontWeight: fontWeight.medium,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },

  // Title styles - medium emphasis
  titleLarge: {
    fontFamily: fontFamily.regular,
    fontWeight: fontWeight.semiBold,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
  },
  titleMedium: {
    fontFamily: fontFamily.medium,
    fontWeight: fontWeight.medium,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontFamily: fontFamily.medium,
    fontWeight: fontWeight.medium,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.1,
  },

  // Label styles - smaller text for UI elements
  labelLarge: {
    fontFamily: fontFamily.medium,
    fontWeight: fontWeight.medium,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontFamily: fontFamily.medium,
    fontWeight: fontWeight.medium,
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontFamily: fontFamily.medium,
    fontWeight: fontWeight.medium,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.5,
  },

  // Body styles - readable text
  bodyLarge: {
    fontFamily: fontFamily.regular,
    fontWeight: fontWeight.regular,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  bodyMedium: {
    fontFamily: fontFamily.regular,
    fontWeight: fontWeight.regular,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontFamily: fontFamily.regular,
    fontWeight: fontWeight.regular,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
  },

  // Additional utility variants
  caption: {
    fontFamily: fontFamily.regular,
    fontWeight: fontWeight.regular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  overline: {
    fontFamily: fontFamily.medium,
    fontWeight: fontWeight.medium,
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },
} as const;

export type Typography = typeof typography;
export type TypographyVariant = keyof Typography;
/**
 * Border radius system for consistent rounded corners
 * Provides semantic naming for different radius sizes
 */

import { moderateScale } from 'react-native-size-matters';

// Base radius values (responsive)
export const radius = {
  none: 0,
  xs: moderateScale(2),
  sm: moderateScale(4),
  md: moderateScale(8),
  lg: moderateScale(12),
  xl: moderateScale(16),
  xxl: moderateScale(24),
  full: 9999, // Creates perfect circles/pills
} as const;

// Component-specific radius presets
export const componentRadius = {
  // Button radius options
  button: {
    sharp: radius.none,
    rounded: radius.md,
    pill: radius.full,
  },
  
  // Card radius
  card: {
    default: radius.lg,
    small: radius.md,
    large: radius.xl,
  },
  
  // Input field radius
  input: {
    sharp: radius.none,
    rounded: radius.md,
    pill: radius.full,
  },
  
  // Modal/Sheet radius
  modal: {
    none: radius.none,
    default: radius.lg,
    large: radius.xl,
  },
  
  // Avatar radius
  avatar: {
    square: radius.none,
    rounded: radius.md,
    circle: radius.full,
  },
  
  // Badge radius
  badge: {
    rounded: radius.sm,
    pill: radius.full,
  },
  
  // Chip radius
  chip: {
    rounded: radius.md,
    pill: radius.full,
  },
  
  // Image radius
  image: {
    none: radius.none,
    small: radius.sm,
    medium: radius.md,
    large: radius.lg,
    circle: radius.full,
  },
  
  // Toast/Snackbar radius
  toast: {
    default: radius.md,
    rounded: radius.lg,
  },
  
  // Progress bar radius
  progress: {
    sharp: radius.none,
    rounded: radius.sm,
    pill: radius.full,
  },
} as const;

// Helper function to create custom radius values
export const createRadius = (value: number) => moderateScale(value);

// Border radius utilities for specific corners
export const borderRadius = {
  // Top corners only
  topLeft: (size: keyof typeof radius) => ({
    borderTopLeftRadius: radius[size],
  }),
  topRight: (size: keyof typeof radius) => ({
    borderTopRightRadius: radius[size],
  }),
  top: (size: keyof typeof radius) => ({
    borderTopLeftRadius: radius[size],
    borderTopRightRadius: radius[size],
  }),
  
  // Bottom corners only
  bottomLeft: (size: keyof typeof radius) => ({
    borderBottomLeftRadius: radius[size],
  }),
  bottomRight: (size: keyof typeof radius) => ({
    borderBottomRightRadius: radius[size],
  }),
  bottom: (size: keyof typeof radius) => ({
    borderBottomLeftRadius: radius[size],
    borderBottomRightRadius: radius[size],
  }),
  
  // Left corners only
  left: (size: keyof typeof radius) => ({
    borderTopLeftRadius: radius[size],
    borderBottomLeftRadius: radius[size],
  }),
  
  // Right corners only
  right: (size: keyof typeof radius) => ({
    borderTopRightRadius: radius[size],
    borderBottomRightRadius: radius[size],
  }),
  
  // All corners
  all: (size: keyof typeof radius) => ({
    borderRadius: radius[size],
  }),
} as const;

export type RadiusSize = keyof typeof radius;
export type ComponentRadius = typeof componentRadius;
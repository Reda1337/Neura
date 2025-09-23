/**
 * Main theme index file
 * Combines all design tokens into light and dark theme objects
 * 
 * This file provides a comprehensive theming system with:
 * - Light and dark theme variants
 * - Complete design tokens (colors, typography, spacing, etc.)
 * - Type-safe theme interfaces
 * - Helper functions for theme creation
 */

import { darkColors, lightColors, type Colors, type ColorScheme } from './colors';
import {
  borderRadius,
  componentRadius,
  createRadius,
  radius,
  type ComponentRadius,
  type RadiusSize
} from './radius';
import {
  avatarSizes,
  componentSpacing,
  containerSizes,
  iconSizes,
  spacing,
  spacingHorizontal,
  spacingVertical,
  type AvatarSize,
  type ComponentSpacing,
  type IconSize,
  type SpacingScale
} from './spacing';
import { typography, type Typography, type TypographyVariant } from './typography';

/**
 * Complete theme interface containing all design tokens and utilities
 */
export interface Theme {
  colors: Colors;
  typography: Typography;
  spacing: SpacingScale;
  spacingHorizontal: SpacingScale;
  spacingVertical: SpacingScale;
  componentSpacing: ComponentSpacing;
  radius: typeof radius;
  componentRadius: ComponentRadius;
  borderRadius: typeof borderRadius;
  iconSizes: typeof iconSizes;
  avatarSizes: typeof avatarSizes;
  containerSizes: typeof containerSizes;
  // Helper functions
  createRadius: typeof createRadius;
}

/**
 * Light theme configuration
 */
export const lightTheme: Theme = {
  colors: lightColors,
  typography,
  spacing,
  spacingHorizontal,
  spacingVertical,
  componentSpacing,
  radius,
  componentRadius,
  borderRadius,
  iconSizes,
  avatarSizes,
  containerSizes,
  createRadius,
} as const;

/**
 * Dark theme configuration
 */
export const darkTheme: Theme = {
  colors: darkColors,
  typography,
  spacing,
  spacingHorizontal,
  spacingVertical,
  componentSpacing,
  radius,
  componentRadius,
  borderRadius,
  iconSizes,
  avatarSizes,
  containerSizes,
  createRadius,
} as const;

/**
 * Theme map for easy switching between light and dark modes
 */
export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

/**
 * Default theme (light mode)
 */
export const defaultTheme = lightTheme;

// Export all types for external usage
export type {
  AvatarSize,
  Colors,
  ColorScheme,
  ComponentRadius,
  ComponentSpacing,
  IconSize,
  RadiusSize,
  SpacingScale,
  Typography,
  TypographyVariant
};

// Export individual design tokens for direct usage when needed
  export {
    avatarSizes,
    borderRadius,
    componentRadius,
    componentSpacing,
    containerSizes,
    createRadius,
    darkColors,
    iconSizes,
    lightColors,
    radius,
    spacing,
    spacingHorizontal,
    spacingVertical,
    typography
  };


/**
 * Color tokens for the design system
 * color palette with golden primary colors
 * Following semantic naming conventions for accessibility and theme switching
 */

// Base color palette - golden primary
const palette = {
  // Primary Colors (Golden)
  primary50: '#fffdf7',
  primary100: '#fffaeb',
  primary200: '#fff3c4',
  primary300: '#ffe588',
  primary400: '#ffd23f',
  primary500: '#ffbe0b',
  primary600: '#f59e0b',
  primary700: '#d97706',
  primary800: '#b45309',
  primary900: '#92400e',

  // Secondary Colors (Neutral grays to complement golden)
  secondary50: '#fafafa',
  secondary100: '#f5f5f5',
  secondary200: '#e5e5e5',
  secondary300: '#d4d4d4',
  secondary400: '#a3a3a3',
  secondary500: '#737373',
  secondary600: '#525252',
  secondary700: '#404040',
  secondary800: '#262626',
  secondary900: '#171717',

  // Neutral Colors (grays)
  neutral50: '#fafafa',
  neutral100: '#f5f5f5',
  neutral200: '#e5e5e5',
  neutral300: '#d4d4d4',
  neutral400: '#a3a3a3',
  neutral500: '#737373',
  neutral600: '#525252',
  neutral700: '#404040',
  neutral800: '#262626',
  neutral900: '#171717',

  // Tertiary/Accent Colors (Blue)
  accent50: '#eff6ff',
  accent100: '#dbeafe',
  accent200: '#bfdbfe',
  accent300: '#93c5fd',
  accent400: '#60a5fa',
  accent500: '#3b82f6',
  accent600: '#1d4ed8',
  accent700: '#1e40af',
  accent800: '#1e3a8a',
  accent900: '#1e3a8a',

  // Semantic Colors
  success50: '#f0fdf4',
  success100: '#dcfce7',
  success500: '#22c55e',
  success600: '#16a34a',
  success700: '#15803d',

  error50: '#fef2f2',
  error100: '#fee2e2',
  error500: '#ef4444',
  error600: '#dc2626',
  error700: '#b91c1c',

  warning50: '#fff7ed',
  warning100: '#ffedd5',
  warning500: '#f97316',
  warning600: '#ea580c',
  warning700: '#c2410c',

  info50: '#eff6ff',
  info100: '#dbeafe',
  info500: '#3b82f6',
  info600: '#2563eb',
  info700: '#1d4ed8',

  // Pure Colors
  white: '#ffffff',
  black: '#000000',
} as const;

// Light theme colors 
export const lightColors = {
  primary: {
    main: palette.primary600,
    light: palette.primary400,
    dark: palette.primary700,
    contrast: palette.black, // Better contrast for golden color
  },
  secondary: {
    main: palette.secondary600,
    light: palette.secondary400,
    dark: palette.secondary700,
    contrast: palette.white,
  },
  background: {
    default: '#f7f9fc', 
    paper: palette.white,
    elevated: palette.white,
  },
  surface: {
    default: palette.white,
    variant: '#f3f4f6', // Warmer variant
    disabled: palette.neutral200,
  },
  text: {
    primary: '#2d3748',
    secondary: palette.neutral600,
    disabled: palette.neutral400,
    inverse: palette.white,
  },
  border: {
    default: palette.neutral200,
    focused: palette.primary600,
    disabled: palette.neutral300,
  },
  success: {
    main: palette.success500,
    light: palette.success100,
    dark: palette.success700,
    contrast: palette.white,
  },
  error: {
    main: palette.error500,
    light: palette.error100,
    dark: palette.error700,
    contrast: palette.white,
  },
  warning: {
    main: palette.warning500,
    light: palette.warning100,
    dark: palette.warning700,
    contrast: palette.black,
  },
  info: {
    main: palette.info500,
    light: palette.info100,
    dark: palette.info700,
    contrast: palette.white,
  },
  golden: {
    main: palette.primary600,
    light: palette.primary200,
    dark: palette.primary700,
    contrast: palette.black,
  },
} as const;

// Dark theme colors
export const darkColors = {
  primary: {
    main: palette.primary500,
    light: palette.primary400,
    dark: palette.primary600,
    contrast: palette.black,
  },
  secondary: {
    main: palette.secondary400,
    light: palette.secondary300,
    dark: palette.secondary600,
    contrast: palette.black,
  },
  background: {
    default: '#1a1d2e', 
    paper: '#252947',
    elevated: '#2d3253',
  },
  surface: {
    default: '#252947',
    variant: '#2d3253',
    disabled: palette.neutral600,
  },
  text: {
    primary: '#f7fafc',
    secondary: '#cbd5e0',
    disabled: palette.neutral500,
    inverse: palette.black,
  },
  border: {
    default: '#4a5568',
    focused: palette.primary500,
    disabled: palette.neutral700,
  },
  success: {
    main: palette.success500,
    light: palette.success50,
    dark: palette.success700,
    contrast: palette.black,
  },
  error: {
    main: palette.error500,
    light: palette.error50,
    dark: palette.error700,
    contrast: palette.white,
  },
  warning: {
    main: palette.warning500,
    light: palette.warning50,
    dark: palette.warning700,
    contrast: palette.black,
  },
  info: {
    main: palette.info500,
    light: palette.info50,
    dark: palette.info700,
    contrast: palette.white,
  },
  golden: {
    main: palette.primary500,
    light: palette.primary50,
    dark: palette.primary700,
    contrast: palette.black,
  },
} as const;

// Define a common color structure type
export interface ColorTokens {
  primary: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
  background: {
    default: string;
    paper: string;
    elevated: string;
  };
  surface: {
    default: string;
    variant: string;
    disabled: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    inverse: string;
  };
  border: {
    default: string;
    focused: string;
    disabled: string;
  };
  success: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
  error: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
  warning: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
  info: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
  golden: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
}

export type Colors = ColorTokens;
export type ColorScheme = 'light' | 'dark';
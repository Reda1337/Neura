/**
 * Responsive spacing system using react-native-size-matters
 * Provides consistent spacing that adapts to different screen sizes
 */

import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

// Base spacing unit (8pt grid system)
const SPACING_UNIT = 8;

// Responsive spacing functions
const createSpacingScale = (baseFn: (size: number) => number) => ({
  0: 0,
  1: baseFn(SPACING_UNIT * 0.5), // 4px
  2: baseFn(SPACING_UNIT * 1),   // 8px
  3: baseFn(SPACING_UNIT * 1.5), // 12px
  4: baseFn(SPACING_UNIT * 2),   // 16px
  5: baseFn(SPACING_UNIT * 3),   // 24px
  6: baseFn(SPACING_UNIT * 4),   // 32px
  7: baseFn(SPACING_UNIT * 5),   // 40px
  8: baseFn(SPACING_UNIT * 6),   // 48px
  9: baseFn(SPACING_UNIT * 8),   // 64px
  10: baseFn(SPACING_UNIT * 10), // 80px
  11: baseFn(SPACING_UNIT * 12), // 96px
  12: baseFn(SPACING_UNIT * 16), // 128px
});

// Horizontal spacing (scales with screen width)
export const spacingHorizontal = createSpacingScale(scale);

// Vertical spacing (scales with screen height)
export const spacingVertical = createSpacingScale(verticalScale);

// General spacing (moderate scaling for balanced approach)
export const spacing = createSpacingScale(moderateScale);

// Component-specific spacing presets
export const componentSpacing = {
  // Button spacing
  button: {
    paddingVertical: spacingVertical[3],
    paddingHorizontal: spacingHorizontal[4],
    marginVertical: spacingVertical[2],
  },
  
  // Card spacing
  card: {
    padding: spacing[4],
    margin: spacing[3],
    borderRadius: moderateScale(12),
  },
  
  // Input field spacing
  input: {
    paddingVertical: spacingVertical[3],
    paddingHorizontal: spacingHorizontal[4],
    marginVertical: spacingVertical[2],
    borderRadius: moderateScale(8),
  },
  
  // List item spacing
  listItem: {
    paddingVertical: spacingVertical[3],
    paddingHorizontal: spacingHorizontal[4],
    marginVertical: spacingVertical[1],
  },
  
  // Screen padding
  screen: {
    paddingHorizontal: spacingHorizontal[4],
    paddingVertical: spacingVertical[3],
  },
  
  // Section spacing
  section: {
    marginVertical: spacingVertical[5],
    paddingVertical: spacingVertical[4],
  },
  
  // Header spacing
  header: {
    paddingHorizontal: spacingHorizontal[4],
    paddingVertical: spacingVertical[3],
    marginBottom: spacingVertical[4],
  },
  
  // Footer spacing
  footer: {
    paddingHorizontal: spacingHorizontal[4],
    paddingVertical: spacingVertical[5],
    marginTop: spacingVertical[6],
  },
} as const;

// Icon sizes (responsive)
export const iconSizes = {
  xs: moderateScale(12),
  sm: moderateScale(16),
  md: moderateScale(20),
  lg: moderateScale(24),
  xl: moderateScale(32),
  xxl: moderateScale(40),
} as const;

// Avatar sizes (responsive)
export const avatarSizes = {
  xs: moderateScale(24),
  sm: moderateScale(32),
  md: moderateScale(40),
  lg: moderateScale(56),
  xl: moderateScale(72),
  xxl: moderateScale(96),
} as const;

// Container widths (responsive)
export const containerSizes = {
  xs: scale(320),
  sm: scale(480),
  md: scale(768),
  lg: scale(1024),
  xl: scale(1280),
} as const;

export type SpacingScale = typeof spacing;
export type ComponentSpacing = typeof componentSpacing;
export type IconSize = keyof typeof iconSizes;
export type AvatarSize = keyof typeof avatarSizes;
/**
 * makeStyles utility for creating theme-aware styles
 * 
 * Provides performance optimization through StyleSheet.create and memoization.
 * This utility is designed for complex styling scenarios where you need theme
 * access and style caching for performance.
 * 
 * For simple components, consider using direct theme access for better clarity:
 * const { theme } = useTheme();
 * const styles = { backgroundColor: theme.colors.primary.main };
 * 
 * Use makeStyles for:
 * - Complex style objects with multiple properties
 * - Styles that depend on multiple theme values
 * - Performance-critical components with frequent re-renders
 */

import { useMemo } from 'react';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useTheme } from '../providers/ThemeProvider';
import { Theme } from '../theme';

// Style types
type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

// Style creator function type
type StyleCreator<T extends NamedStyles<T>> = (theme: Theme) => T;

// Cached styles map for performance optimization
const styleCache = new Map<string, any>();

/**
 * Creates a theme-aware style creator function with caching
 * 
 * @param styleCreator Function that receives theme and returns style object
 * @returns Memoized style creator function
 * 
 * @example
 * const stylesCreator = createStyles((theme) => ({
 *   container: {
 *     backgroundColor: theme.colors.background.default,
 *     padding: theme.spacing[4],
 *   }
 * }));
 */
export function createStyles<T extends NamedStyles<T>>(
  styleCreator: StyleCreator<T>
): (theme: Theme) => T {
  return (theme: Theme) => {
    // Create a cache key based on color scheme to differentiate light/dark themes
    const cacheKey = `${theme.colors.primary.main}-${theme.colors.background.default}`;
    
    // Check if styles are already cached for this theme
    if (styleCache.has(cacheKey)) {
      return styleCache.get(cacheKey);
    }
    
    // Create new optimized styles using StyleSheet.create
    const styles = StyleSheet.create(styleCreator(theme));
    
    // Cache the styles for future use
    styleCache.set(cacheKey, styles);
    
    return styles;
  };
}

/**
 * React hook for creating theme-aware styles with automatic memoization
 * 
 * This is the recommended approach for most use cases as it automatically
 * handles theme updates and provides optimal performance.
 * 
 * @param styleCreator Function that receives theme and returns style object
 * @returns Memoized styles object
 * 
 * @example
 * const useStyles = createStylesHook((theme) => ({
 *   container: {
 *     backgroundColor: theme.colors.background.default,
 *     padding: theme.spacing[4],
 *   },
 *   text: {
 *     color: theme.colors.text.primary,
 *     ...theme.typography.bodyLarge,
 *   }
 * }));
 * 
 * // In component:
 * const styles = useStyles();
 */
export function createStylesHook<T extends NamedStyles<T>>(
  styleCreator: StyleCreator<T>
): () => T {
  return () => {
    const { theme } = useTheme();
    
    return useMemo(() => {
      const stylesCreator = createStyles(styleCreator);
      return stylesCreator(theme);
    }, [theme]);
  };
}

/**
 * Hook version of makeStyles that automatically uses the current theme
 * 
 * @deprecated Use createStylesHook instead for better performance and naming clarity
 */
export function useMakeStyles<T extends NamedStyles<T>>(
  styleCreator: StyleCreator<T>
): T {
  const { theme } = useTheme();
  
  return useMemo(() => {
    const stylesCreator = createStyles(styleCreator);
    return stylesCreator(theme);
  }, [theme, styleCreator]);
}

/**
 * Creates responsive styles based on screen dimensions
 * 
 * @deprecated Use createStylesHook with conditional logic instead
 */
export function useResponsiveStyles<T extends NamedStyles<T>>(
  styleCreator: (theme: Theme, dimensions: { width: number; height: number }) => T,
  dimensions: { width: number; height: number }
): T {
  const { theme } = useTheme();
  
  return useMemo(() => {
    return StyleSheet.create(styleCreator(theme, dimensions));
  }, [theme, styleCreator, dimensions]);
}

/**
 * Utility function to conditionally apply styles based on theme
 * Usage: const dynamicStyle = conditionalStyle(theme.isDark, darkStyle, lightStyle)
 */
export function conditionalStyle<T>(
  condition: boolean,
  trueStyle: T,
  falseStyle: T
): T {
  return condition ? trueStyle : falseStyle;
}

/**
 * Helper to merge multiple style objects
 * Usage: const mergedStyle = mergeStyles(baseStyle, conditionalStyle, theme.typography.bodyLarge)
 */
export function mergeStyles(...styles: (ViewStyle | TextStyle | ImageStyle | undefined | null | false)[]): ViewStyle | TextStyle | ImageStyle {
  return StyleSheet.flatten(styles.filter(Boolean)) as ViewStyle | TextStyle | ImageStyle;
}

/**
 * Creates a style variant system for components
 * Usage: const buttonVariants = createVariants({ 
 *   primary: (theme) => ({ backgroundColor: theme.colors.primary.main }),
 *   secondary: (theme) => ({ backgroundColor: theme.colors.secondary.main })
 * })
 */
export function createVariants<T extends Record<string, StyleCreator<any>>>(
  variants: T
): { [K in keyof T]: (theme: Theme) => ReturnType<T[K]> } {
  const variantCreators = {} as { [K in keyof T]: (theme: Theme) => ReturnType<T[K]> };
  
  for (const [key, styleCreator] of Object.entries(variants)) {
    variantCreators[key as keyof T] = createStyles(styleCreator);
  }
  
  return variantCreators;
}

/**
 * Hook to use style variants with automatic theme injection
 * Usage: const variantStyles = useVariant(variants, 'primary')
 */
export function useVariant<T extends Record<string, any>>(
  variants: { [K in keyof T]: (theme: Theme) => T[K] },
  variant: keyof T
): T[keyof T] {
  const { theme } = useTheme();
  
  return useMemo(() => {
    const variantCreator = variants[variant];
    if (!variantCreator) {
      throw new Error(`Variant "${String(variant)}" not found in variants object`);
    }
    return variantCreator(theme);
  }, [variants, variant, theme]);
}

/**
 * Utility to create theme-aware dimensions
 * Usage: const dimensions = useThemeDimensions((theme) => ({ width: theme.spacing[4] * 2 }))
 */
export function useThemeDimensions<T>(
  dimensionCreator: (theme: Theme) => T
): T {
  const { theme } = useTheme();
  
  return useMemo(() => {
    return dimensionCreator(theme);
  }, [theme, dimensionCreator]);
}

// Clear style cache (useful for development or theme switching)
export function clearStyleCache(): void {
  styleCache.clear();
}
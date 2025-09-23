# Theme System

Comprehensive theming with semantic tokens, responsive spacing, and dark mode support.

## Color System

### Structure
```typescript
interface Colors {
  primary: ColorVariant;      // Golden brand color
  secondary: ColorVariant;    // Neutral gray
  success: ColorVariant;      // Green
  error: ColorVariant;        // Red
  warning: ColorVariant;      // Orange
  
  text: {
    primary: string;          // Main text
    secondary: string;        // Secondary text
    disabled: string;         // Disabled text
  };
  
  background: {
    default: string;          // Main background
    variant: string;          // Alt background
  };
  
  surface: {
    default: string;          // Cards, modals
    variant: string;          // Alt surface
  };
  
  border: {
    default: string;          // Default borders
    variant: string;          // Alt borders
  };
}
```

### Usage
```tsx
import { useTheme } from '@/src';

function MyComponent() {
  const { theme } = useTheme();
  
  return (
    <View style={{
      backgroundColor: theme.colors.background.default,
      borderColor: theme.colors.border.default,
    }}>
      <Text style={{ color: theme.colors.text.primary }}>
        Primary text
      </Text>
    </View>
  );
}
```

## Typography Scale

Material Design 3 inspired typography with 12 variants:

```typescript
interface Typography {
  displayLarge: TextStyle;    // 57px - Hero headings
  headlineMedium: TextStyle;  // 28px - Section headers  
  titleLarge: TextStyle;      // 22px - Subsection titles
  bodyLarge: TextStyle;       // 18px - Main body text
  labelMedium: TextStyle;     // 13px - Form labels
  caption: TextStyle;         // 12px - Annotations
  // ... other variants
}
```

Usage:
```tsx
<Text style={[theme.typography.displayLarge, { color: theme.colors.text.primary }]}>
  Hero Title
</Text>
```

## Spacing System

Responsive spacing using `react-native-size-matters`:

```typescript
theme.spacing[0]   // 0px
theme.spacing[4]   // ~16px (device scaled)
theme.spacing[8]   // ~32px (device scaled)

// Directional spacing
theme.spacingHorizontal[4]  // Horizontal scaling
theme.spacingVertical[4]    // Vertical scaling
```

Usage:
```tsx
<View style={{
  padding: theme.spacing[4],
  marginVertical: theme.spacing[6],
}}>
  Content
</View>
```

## Border Radius

```typescript
theme.radius.none    // 0px
theme.radius.sm      // 4px
theme.radius.md      // 8px (default)
theme.radius.lg      // 12px
theme.radius.full    // 9999px (circular)
```

## Theme Provider

### Setup
```tsx
import { ThemeProvider } from '@/src/providers/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Hooks

```tsx
import { useTheme, useColorSchemeUtils } from '@/src';

function MyComponent() {
  const { theme, colorScheme, isDark, toggleColorScheme } = useTheme();
  const { setLight, setDark, setAuto } = useColorSchemeUtils();
  
  return (
    <View style={{ backgroundColor: theme.colors.background.default }}>
      <Text>Current: {colorScheme}</Text>
      <Button title="Toggle" onPress={toggleColorScheme} />
    </View>
  );
}
```

## Best Practices

### Colors
- Use semantic tokens instead of hardcoded values
- Test both light and dark modes
- Ensure proper contrast ratios

### Spacing  
- Use spacing scale consistently
- Prefer larger values for touch targets
- Consider screen size differences

### Typography
- Use appropriate variants for hierarchy
- Don't override sizes arbitrarily
- Test on various screen sizes

### Performance
- Access theme in render functions, not module scope
- Use memoization for complex calculations
- Avoid creating objects in render with theme values
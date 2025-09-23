# Design System Guide

Complete design system for React Native with theme management, responsive scaling, and TypeScript support.

## 🚀 Features

- **Theme System**: Semantic color tokens, light/dark mode
- **Responsive Spacing**: Device-aware scaling with react-native-size-matters

### Theme Access
```tsx
import { useTheme } from '@/src';

function MyComponent() {
  const { theme, isDark, toggleColorScheme } = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background.default }}>
      <Text style={{ color: theme.colors.text.primary }}>
        Theme: {isDark ? 'Dark' : 'Light'}
      </Text>
    </View>
  );
}
```

### Styling Methods

**External Styles (Recommended)**
```tsx
import { createStylesHook } from '@/src';

const useStyles = createStylesHook((theme) => ({
  container: {
    backgroundColor: theme.colors.background.default,
    padding: theme.spacing[4],
  },
}));

function MyComponent() {
  const styles = useStyles();
  return <View style={styles.container}>...</View>;
}
```

**Internal Styles**
```tsx
import { makeStyles } from '@/src';

function MyComponent() {
  const styles = makeStyles((theme) => ({
    container: {
      backgroundColor: theme.colors.background.default,
      padding: theme.spacing[4],
    },
  }));

  return <View style={styles.container}>...</View>;
}
```

##  Components

### ThemedText
```tsx
<ThemedText variant="headlineLarge">Title</ThemedText>
<ThemedText variant="bodyLarge" color="secondary">Subtitle</ThemedText>
```

### ThemedButton
```tsx
<ThemedButton variant="filled" color="primary">Primary</ThemedButton>
<ThemedButton variant="outlined">Secondary</ThemedButton>
<ThemedButton loading size="large">Loading</ThemedButton>
```

## � Dark Mode

```tsx
import { useColorSchemeUtils } from '@/src';

function ThemeToggle() {
  const { isDark, toggleColorScheme, setAuto } = useColorSchemeUtils();
  
  return (
    <Button title="Toggle Theme" onPress={toggleColorScheme} />
  );
}
```
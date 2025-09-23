# Component Reference

## ThemedText

Typography component with Material Design 3 variants.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `TypographyVariant` | `'bodyMedium'` | Typography variant |
| `color` | `'primary' \| 'secondary' \| 'disabled' \| string` | `'primary'` | Text color |
| `children` | `React.ReactNode` | - | Content |

### Variants

| Variant | Size | Weight | Use Case |
|---------|------|--------|----------|
| `displayLarge` | 57px | 700 | Hero headings |
| `headlineMedium` | 28px | 500 | Section headers |
| `titleLarge` | 22px | 600 | Subsection titles |
| `bodyLarge` | 18px | 400 | Main body text |
| `labelMedium` | 13px | 500 | Form labels |
| `caption` | 12px | 400 | Annotations |

### Usage

```tsx
import { ThemedText } from '@/src/components';

<ThemedText variant="headlineMedium">Section Header</ThemedText>
<ThemedText variant="bodyLarge" color="secondary">Subtitle</ThemedText>
<ThemedText color="#ff6b6b">Custom color</ThemedText>
```

## ThemedButton

Button component with Material Design 3 variants, loading states, and accessibility.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'filled' \| 'outlined' \| 'text' \| 'elevated'` | `'filled'` | Button style |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning'` | `'primary'` | Color scheme |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `loading` | `boolean` | `false` | Loading state |
| `fullWidth` | `boolean` | `false` | Full width |
| `children` | `React.ReactNode` | - | Button content |

### Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `filled` | Solid background | Primary actions |
| `outlined` | Border only | Secondary actions |
| `text` | No background | Tertiary actions |
| `elevated` | Shadow effect | Floating actions |

### Usage

```tsx
import { ThemedButton } from '@/src/components/ThemedButton';

// Basic variants
<ThemedButton variant="filled" color="primary">Primary</ThemedButton>
<ThemedButton variant="outlined">Secondary</ThemedButton>
<ThemedButton variant="text">Text Button</ThemedButton>

// States and sizes
<ThemedButton loading>Loading...</ThemedButton>
<ThemedButton disabled>Disabled</ThemedButton>
<ThemedButton size="large" fullWidth>Large Full Width</ThemedButton>

// Colors
<ThemedButton color="success">Success</ThemedButton>
<ThemedButton color="error">Delete</ThemedButton>
```

### Best Practices

- Use `filled` for primary actions, `outlined` for secondary
- Reserve semantic colors (success, error) for their contexts
- Provide loading feedback for async operations
- Touch targets follow platform guidelines (iOS: 44pt, Android: 48dp)
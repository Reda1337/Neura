/**
 * Design System Demo
 * 
 * A comprehensive showcase of the design system components and theming capabilities.
 * This demo includes typography, buttons, colors, spacing, and radius examples.
 */

import { createStylesHook, useColorSchemeUtils, useTheme } from '@/src';
import {
  BodyText,
  CaptionText,
  DisplayText,
  HeadlineText,
  ThemedText,
  TitleText
} from '@/src/components';
import { ThemedButton } from '@/src/components/ThemedButton';
import React from 'react';
import { ScrollView, View } from 'react-native';

const useHomeScreenStyles = createStylesHook((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  scrollContainer: {
    padding: theme.spacing[5],
  },
  section: {
    marginVertical: theme.spacing[6],
  },
  sectionTitle: {
    marginBottom: theme.spacing[4],
  },
  typographyContainer: {
    gap: theme.spacing[3],
  },
  buttonContainer: {
    gap: theme.spacing[4],
  },
  colorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing[2],
  },
  colorBox: {
    width: theme.spacing[12],
    height: theme.spacing[12],
    borderRadius: theme.radius.md,
    marginBottom: theme.radius.md,
  },
}));

export default function HomeScreen() {
  const styles = useHomeScreenStyles();
  const { isDark, toggleColorScheme } = useColorSchemeUtils();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.section}>
          <DisplayText>Design System</DisplayText>
          <BodyText color="secondary">
            A production-grade design system for React Native with Expo
          </BodyText>
        </View>

        {/* Theme Toggle */}
        <View style={styles.section}>
          <TitleText style={styles.sectionTitle}>Theme</TitleText>
          <ThemedButton
            onPress={toggleColorScheme}
            variant="outlined"
            fullWidth
          >
            Switch to {isDark ? 'Light' : 'Dark'} Mode
          </ThemedButton>
        </View>

        {/* Typography */}
        <View style={styles.section}>
          <TitleText style={styles.sectionTitle}>Typography</TitleText>
          <View style={styles.typographyContainer}>
            <ThemedText variant="displayLarge">Display Large</ThemedText>
            <ThemedText variant="headlineMedium">Headline Medium</ThemedText>
            <ThemedText variant="titleLarge">Title Large</ThemedText>
            <ThemedText variant="titleMedium">Title Medium</ThemedText>
            <ThemedText variant="titleSmall">Title Small</ThemedText>
            <ThemedText variant="bodyLarge">Body Large - This is the default body text size</ThemedText>
            <ThemedText variant="bodyMedium">Body Medium - Slightly smaller body text</ThemedText>
            <ThemedText variant="bodySmall">Body Small - Small body text for supplementary content</ThemedText>
            <ThemedText variant="labelLarge">Label Large</ThemedText>
            <ThemedText variant="labelMedium">Label Medium</ThemedText>
            <ThemedText variant="labelSmall">Label Small</ThemedText>
            <ThemedText variant="caption">Caption - Smallest text for annotations</ThemedText>
          </View>
        </View>

        {/* Pre-configured Text Components */}
        <View style={styles.section}>
          <TitleText style={styles.sectionTitle}>Text Components</TitleText>
          <View style={styles.typographyContainer}>
            <DisplayText>Display Text Component</DisplayText>
            <HeadlineText>Headline Text Component</HeadlineText>
            <TitleText>Title Text Component</TitleText>
            <BodyText>Body Text Component - Great for paragraphs</BodyText>
            <CaptionText>Caption Text Component</CaptionText>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.section}>
          <TitleText style={styles.sectionTitle}>Buttons</TitleText>
          <View style={styles.buttonContainer}>
            <ThemedButton variant="filled" color="primary">Primary Button</ThemedButton>
            <ThemedButton variant="filled" color="secondary">Secondary Button</ThemedButton>
            <ThemedButton variant="outlined" color="primary">Outlined Button</ThemedButton>
            <ThemedButton variant="text" color="primary">Text Button</ThemedButton>
            <ThemedButton variant="elevated" color="primary">Elevated Button</ThemedButton>
            <ThemedButton variant="filled" color="success">Success Button</ThemedButton>
            <ThemedButton variant="filled" color="error">Error Button</ThemedButton>
            <ThemedButton variant="filled" color="warning">Warning Button</ThemedButton>
            <ThemedButton variant="filled" size="small">Small Button</ThemedButton>
            <ThemedButton variant="filled" size="large">Large Button</ThemedButton>
            <ThemedButton variant="filled" loading>Loading Button</ThemedButton>
            <ThemedButton variant="filled" disabled>Disabled Button</ThemedButton>
            <ThemedButton variant="filled" fullWidth>Full Width Button</ThemedButton>
          </View>
        </View>

        {/* Colors */}
        <View style={styles.section}>
          <TitleText style={styles.sectionTitle}>Colors</TitleText>
          <BodyText style={{ marginBottom: 16 }}>Primary Colors</BodyText>
          <ColorPalette />
        </View>

        {/* Spacing */}
        <View style={styles.section}>
          <TitleText style={styles.sectionTitle}>Spacing</TitleText>
          <SpacingDemo />
        </View>

        {/* Radius */}
        <View style={styles.section}>
          <TitleText style={styles.sectionTitle}>Border Radius</TitleText>
          <RadiusDemo />
        </View>
      </ScrollView>
    </View>
  );
}

/**
 * Color palette demonstration component
 */
function ColorPalette() {
  const styles = useHomeScreenStyles();
  const { theme } = useTheme();

  const colors = [
    { name: 'Primary', color: theme.colors.primary.main },
    { name: 'Secondary', color: theme.colors.secondary.main },
    { name: 'Success', color: theme.colors.success.main },
    { name: 'Warning', color: theme.colors.warning.main },
    { name: 'Error', color: theme.colors.error.main },
    { name: 'Info', color: theme.colors.info.main },
  ];

  return (
    <View style={styles.colorPalette}>
      {colors.map(({ name, color }) => (
        <View key={name}>
          <View style={[styles.colorBox, { backgroundColor: color }]} />
          <CaptionText>{name}</CaptionText>
        </View>
      ))}
    </View>
  );
}

/**
 * Spacing demonstration component
 */
function SpacingDemo() {
  const { theme } = useTheme();

  const spacingValues = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12];

  return (
    <View>
      {spacingValues.map((value) => (
        <View key={value} style={{ marginBottom: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: theme.spacing[value as keyof typeof theme.spacing],
                height: 20,
                backgroundColor: theme.colors.primary.main,
                marginRight: 8,
              }}
            />
            <CaptionText>Spacing {value}: {theme.spacing[value as keyof typeof theme.spacing]}px</CaptionText>
          </View>
        </View>
      ))}
    </View>
  );
}

/**
 * Border radius demonstration component
 */
function RadiusDemo() {
  const { theme } = useTheme();

  const radiusValues = [
    { name: 'None', value: theme.radius.none },
    { name: 'XS', value: theme.radius.xs },
    { name: 'SM', value: theme.radius.sm },
    { name: 'MD', value: theme.radius.md },
    { name: 'LG', value: theme.radius.lg },
    { name: 'XL', value: theme.radius.xl },
    { name: 'XXL', value: theme.radius.xxl },
    { name: 'Full', value: theme.radius.full },
  ];

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      {radiusValues.map(({ name, value }) => (
        <View key={name} style={{ alignItems: 'center' }}>
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: theme.colors.primary.main,
              borderRadius: value,
              marginBottom: 8,
            }}
          />
          <CaptionText>{name}</CaptionText>
          <CaptionText>{value}px</CaptionText>
        </View>
      ))}
    </View>
  );
}
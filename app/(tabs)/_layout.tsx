import { Tabs } from 'expo-router';
import React from 'react';
import { Text, useColorScheme, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#38bdf8' : '#0284c7',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#94a3b8' : '#64748b',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1e293b' : '#ffffff',
          borderTopColor: colorScheme === 'dark' ? '#334155' : '#e2e8f0',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Design System',
          tabBarIcon: ({ color }) => (
            <View style={{ 
              width: 28, 
              height: 28, 
              backgroundColor: color, 
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{ fontSize: 16 }}>🎨</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          // backgroundColor: '#f8f9fa',
           backgroundColor: '#88bef4ff',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: '#ffffff',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'AI Summarizer',
          tabBarIcon: ({ color, size }) => (
            <span style={{ fontSize: size, color }}>📝</span>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore Models',
          tabBarIcon: ({ color, size }) => (
            <span style={{ fontSize: size, color }}>🔍</span>
          ),
        }}
      />
    </Tabs>
  );
}
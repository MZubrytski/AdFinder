import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors, Text } from 'react-native-ui-lib';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primaryColor,
        headerShown: true,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => {
            return (
              <TabBarIcon
                name={focused ? 'home' : 'home-outline'}
                color={color}
              />
            );
          },
          headerTitle: () => (
            <Text marginT-16 pageHeader>
              Home
            </Text>
          ),
          headerRight: () => (
            <Text
              marginT-16
              marginR-16
              primaryColor
              bodyMedium
              onPress={() => {}}
            >
              Filter
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'bookmark' : 'bookmark-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="CreateAd"
        options={{
          title: 'Create Advert',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'add-circle' : 'add-circle-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'mail' : 'mail-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'person' : 'person-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

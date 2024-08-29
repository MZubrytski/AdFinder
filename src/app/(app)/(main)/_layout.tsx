import { router, Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors, Text } from 'react-native-ui-lib';
import { HeaderIcon } from '@/components/navigation/HeaderIcon';

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
          headerTitle: () => (
            <Text marginT-16 pageHeader>
              Create Advert
            </Text>
          ),
          headerLeft: () => (
            <HeaderIcon
              name="arrow-back-outline"
              style={{ marginTop: 20, marginLeft: 16 }}
              onPress={() => {
                router.back();
              }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'add-circle' : 'add-circle-outline'}
              color={color}
            />
          ),
          tabBarHideOnKeyboard: true,
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

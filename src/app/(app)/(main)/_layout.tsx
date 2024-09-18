import { router, Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors, Text } from 'react-native-ui-lib';
import { HeaderIcon } from '@/components/navigation/HeaderIcon';
import { useTranslation } from 'react-i18next';
import { storage } from '@/storage';

export default function TabLayout() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.resolvedLanguage === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
    storage.setItem('userLanguage', newLang);
  };

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
          title: t('tabs.home'),
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
              {t('tabs.home')}
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
              {t('buttons.filter')}
            </Text>
          ),
          headerLeft: () => (
            <Text
              marginT-16
              marginL-16
              primaryColor
              bodyMedium
              onPress={toggleLanguage}
            >
              {i18n.resolvedLanguage === 'en' ? 'EN' : 'RU'}
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Favorites"
        options={{
          title: t('tabs.favorites'),
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
          title: t('tabs.create'),
          headerTitle: () => (
            <Text marginT-16 headerSmall>
              {t('text.createAdvert')}
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
          title: t('tabs.messages'),
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
          title: t('tabs.profile'),
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

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { router, Stack } from 'expo-router';
import React from 'react';

export default function AdvertLayout() {
  return (
    <Stack
      screenOptions={{
        title: 'Advert Layout',
        headerLeft: () => (
          <TabBarIcon
            name="arrow-back"
            onPress={() => {
              router.back();
            }}
          />
        ),
      }}
    />
  );
}

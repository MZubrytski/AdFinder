import { DeleteAdvertIcon } from '@/components/navigation/DeleteAdvertIcon';
import { HeaderIcon } from '@/components/navigation/HeaderIcon';
import { router, Stack } from 'expo-router';
import React from 'react';
import { Colors } from 'react-native-ui-lib';

export default function AdvertLayout() {
  return (
    <Stack
      screenOptions={{
        title: '',
        headerLeft: () => (
          <HeaderIcon
            name="arrow-back"
            style={{ marginRight: 12 }}
            onPress={() => {
              router.back();
            }}
          />
        ),
        headerRight: () => <DeleteAdvertIcon />,
        contentStyle: {
          backgroundColor: Colors.gray100,
        },
      }}
    />
  );
}

import { OFFLINE_AVAILABLE_PATHS, PUBLIC_PATHS } from '@/constants/navigation';
import { Redirect, Slot, usePathname } from 'expo-router';
import React from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { useAuthContext } from '@/context/auth/AuthContext';
import { useNetInfo } from '@react-native-community/netinfo';

export default function TabLayout() {
  const pathName = usePathname();
  const { isSignedIn, isLoading } = useAuthContext();
  const { isConnected } = useNetInfo();

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!isSignedIn && !PUBLIC_PATHS.includes(pathName)) {
    return <Redirect href="/Sign-in" />;
  }

  if (
    !isConnected &&
    !OFFLINE_AVAILABLE_PATHS.includes(pathName) &&
    !pathName.includes('/advert')
  ) {
    return <Redirect href="/Offline" />;
  }

  return <Slot />;
}

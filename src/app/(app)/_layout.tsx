import { publicPath } from '@/constants/navigation';
import { Redirect, Slot, usePathname } from 'expo-router';
import React from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { useAuthContext } from '@/context/auth/AuthContext';

export default function TabLayout() {
  const pathName = usePathname();
  const { isSignedIn, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!isSignedIn && !publicPath.includes(pathName)) {
    return <Redirect href="/Sign-in" />;
  }

  return <Slot />;
}

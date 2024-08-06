import { useAuthContext } from '@/context/auth/AuthContext';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  const { isSignedIn } = useAuthContext();

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <Stack>
      <Stack.Screen name="Sign-in" options={{ title: 'Sign In Page' }} />
      <Stack.Screen name="Sign-up" options={{ title: 'Sign Up Page' }} />
    </Stack>
  );
}

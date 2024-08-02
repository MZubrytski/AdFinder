import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="Sign-in" options={{ title: 'Sign In Page' }} />
      <Stack.Screen name="Sign-up" options={{ title: 'Sign Up Page' }} />
    </Stack>
  );
}

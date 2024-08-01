import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ title: 'Sign In Page' }} />
      <Stack.Screen name="sign-up" options={{ title: 'Sign Up Page' }} />
    </Stack>
  );
}

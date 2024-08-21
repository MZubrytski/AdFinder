import { useAuthContext } from '@/context/auth/AuthContext';
import { Redirect, router, Stack } from 'expo-router';
import React from 'react';
import { Colors, Text } from 'react-native-ui-lib';
import { HeaderIcon } from '@/components/navigation/HeaderIcon';

export default function AuthLayout() {
  const { isSignedIn } = useAuthContext();

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        contentStyle: {
          paddingHorizontal: 16,
          backgroundColor: Colors.light100,
        },
      }}
    >
      <Stack.Screen
        name="Sign-in"
        options={{
          headerTitle: () => (
            <Text marginT-16 pageHeader>
              Log In
            </Text>
          ),
          headerRight: () => (
            <Text
              marginT-16
              primaryColor
              bodyMedium
              onPress={() => {
                router.navigate('/Sign-up');
              }}
            >
              Sign up
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="Sign-up"
        options={{
          headerTitle: () => (
            <Text marginT-16 pageHeader>
              Sign Up
            </Text>
          ),
          headerLeft: () => (
            <HeaderIcon
              name="close-outline"
              color={Colors.gray300}
              style={{ marginTop: 20 }}
              onPress={() => {
                router.back();
              }}
            />
          ),
          headerBackVisible: false,
          headerRight: () => (
            <Text
              marginT-16
              primaryColor
              bodyMedium
              onPress={() => {
                router.back();
              }}
            >
              Login
            </Text>
          ),
        }}
      />
    </Stack>
  );
}

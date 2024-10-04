import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthContextProvider } from '@/context/auth/AuthContext';
import '../../firebaseConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '../theme';
import '../localization';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SQLiteProvider } from 'expo-sqlite';
import { DATABASE_NAME, SQLiteDB } from './../db';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthContextProvider>
          <SQLiteProvider
            databaseName={DATABASE_NAME}
            onInit={SQLiteDB.migrateDbIfNeeded}
          >
            <GestureHandlerRootView>
              <Slot />
            </GestureHandlerRootView>
          </SQLiteProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

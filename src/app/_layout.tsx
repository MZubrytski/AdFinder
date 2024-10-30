import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthContextProvider } from '@/context/auth/AuthContext';
import '../../firebaseConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '../theme';
import '../localization';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SQLiteDB } from './../db';
import { ToastProvider } from 'react-native-toast-notifications';
import { ToastNotification } from '@/components/ui/ToastNotification';
import { NOTIFICATION_DURATION } from '@/constants/notification';
import * as Font from 'expo-font';
import { View } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
        });
        await SQLiteDB.migrateDbIfNeeded();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthContextProvider>
          <ToastProvider
            duration={NOTIFICATION_DURATION}
            renderType={{
              custom_success: (toast) => <ToastNotification toast={toast} />,
              custom_error: (toast) => <ToastNotification toast={toast} />,
            }}
          >
            <GestureHandlerRootView>
              <View
                style={{
                  flex: 1,
                }}
                onLayout={onLayoutRootView}
              >
                <Slot></Slot>
              </View>
            </GestureHandlerRootView>
          </ToastProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

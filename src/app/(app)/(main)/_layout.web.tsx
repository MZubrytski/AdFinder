import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          title: 'AdFinder',
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
          }}
        />
        <Drawer.Screen
          name="Favorites"
          options={{
            drawerLabel: 'Favorites',
          }}
        />
        <Drawer.Screen
          name="CreateAd"
          options={{
            drawerLabel: 'Create',
          }}
        />
        <Drawer.Screen
          name="Messages"
          options={{
            drawerLabel: 'Messages',
          }}
        />
        <Drawer.Screen
          name="Profile"
          options={{
            drawerLabel: 'Profile',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

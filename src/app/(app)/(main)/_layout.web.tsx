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
          name="favorites"
          options={{
            drawerLabel: 'Favorites',
          }}
        />
        <Drawer.Screen
          name="create"
          options={{
            drawerLabel: 'Create',
          }}
        />
        <Drawer.Screen
          name="messages"
          options={{
            drawerLabel: 'Messages',
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: 'Profile',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

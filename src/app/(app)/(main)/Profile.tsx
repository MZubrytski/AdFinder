import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from 'react-native-paper';
import { useAuthContext } from '@/context/auth/AuthContext';

export default function ProfileScreen() {
  const { logout } = useAuthContext();
  return (
    <ThemedView>
      <ThemedText>Profile Screen</ThemedText>
      <Button icon="logout" mode="contained" onPress={() => logout()}>
        Logout
      </Button>
    </ThemedView>
  );
}

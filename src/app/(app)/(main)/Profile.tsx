import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuthContext } from '@/context/auth/AuthContext';
import { Text } from 'react-native';

export default function ProfileScreen() {
  const { logout } = useAuthContext();
  return (
    <ThemedView>
      <ThemedText>Profile Screen</ThemedText>
      <Text onPress={() => logout()}>Logout</Text>
    </ThemedView>
  );
}

import { useAuthContext } from '@/context/auth/AuthContext';
import { Text, View } from 'react-native';

export default function ProfileScreen() {
  const { logout } = useAuthContext();
  return (
    <View>
      <Text>Profile Screen</Text>
      <Text onPress={() => logout()}>Logout</Text>
    </View>
  );
}

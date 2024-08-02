import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function SignInScreen() {
  return (
    <View>
      <Text>Sing In!</Text>
      <Link href="/Sign-up">Not register yet? Sign Up!</Link>
    </View>
  );
}

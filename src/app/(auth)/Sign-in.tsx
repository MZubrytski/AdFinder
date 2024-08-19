import { Link } from 'expo-router';
import { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { useAuthContext } from '@/context/auth/AuthContext';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuthContext();

  return (
    <View>
      <Text>Sing In!</Text>
      <TextInput value={email} onChangeText={(text) => setEmail(text)} />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <Text onPress={() => signIn(email, password)}>Login</Text>
      <Link href="/Sign-up" asChild>
        <Pressable>
          <Text>Sign Up</Text>
        </Pressable>
      </Link>
    </View>
  );
}

import { Link, Redirect } from 'expo-router';
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useAuthContext } from '@/context/auth/AuthContext';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isSignedIn } = useAuthContext();

  return isSignedIn ? (
    <Redirect href="/" />
  ) : (
    <View>
      <Text>Sing In!</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <Button
        icon="login"
        mode="contained"
        onPress={() => signIn(email, password)}
      >
        Login
      </Button>
      <Link href="/Sign-up" asChild>
        <Pressable>
          <Text>Sign Up</Text>
        </Pressable>
      </Link>
    </View>
  );
}

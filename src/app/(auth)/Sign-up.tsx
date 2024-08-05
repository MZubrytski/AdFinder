import { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Redirect } from 'expo-router';
import { useAuthContext } from '@/context/auth/AuthContext';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const { isSignedIn, signUp } = useAuthContext();

  return isSignedIn ? (
    <Redirect href="/" />
  ) : (
    <View>
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
      <TextInput
        label="Repeat the password"
        value={repeatedPassword}
        onChangeText={(text) => setRepeatedPassword(text)}
        secureTextEntry={true}
      />
      <Button
        icon="login"
        mode="contained"
        onPress={() => signUp(email, password, repeatedPassword)}
      >
        Sign Up
      </Button>
    </View>
  );
}

import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useAuthContext } from '@/context/auth/AuthContext';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const { signUp } = useAuthContext();

  return (
    <View>
      <TextInput value={email} onChangeText={(text) => setEmail(text)} />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TextInput
        value={repeatedPassword}
        onChangeText={(text) => setRepeatedPassword(text)}
        secureTextEntry={true}
      />
      <Text onPress={() => signUp(email, password, repeatedPassword)}>
        Sign Up
      </Text>
    </View>
  );
}

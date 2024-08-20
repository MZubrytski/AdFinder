import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { useAuthContext } from '@/context/auth/AuthContext';
import { AppTextField } from '@/components/ui/AppTextField';
import { Colors, Text, View } from 'react-native-ui-lib';
import { AppButton } from '@/components/ui/AppButton';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuthContext();

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: Colors.light100,
      }}
    >
      <Text marginB-16>Sing In!</Text>
      <AppTextField
        placeholder="Email"
        modifiers={{ 'marginB-16': true }}
        onChangeText={(text: string) => setEmail(text)}
      />
      <AppTextField
        placeholder="Password"
        modifiers={{ 'marginB-16': true }}
        onChangeText={(text: string) => setPassword(text)}
        trailingAccessory={
          <Text
            primaryColor
            onPress={() => setShowPassword((isShowPassword) => !isShowPassword)}
          >
            {showPassword ? 'Hide' : 'View'}
          </Text>
        }
        secureTextEntry={!showPassword}
      />

      <AppButton onPress={() => signIn(email, password)}>Log In</AppButton>
      <Link href="/Sign-up" asChild>
        <Pressable>
          <Text>Sign Up</Text>
        </Pressable>
      </Link>
    </View>
  );
}

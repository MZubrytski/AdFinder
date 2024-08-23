import { useState } from 'react';
import { useAuthContext } from '@/context/auth/AuthContext';
import { AppTextField } from '@/components/ui/AppTextField';
import { Text, View } from 'react-native-ui-lib';
import { AppButton } from '@/components/ui/AppButton';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signUp } = useAuthContext();

  return (
    <View flex>
      <View>
        <AppTextField
          placeholder="Name"
          modifiers={{ 'marginB-16': true, 'marginT-32': true }}
          onChangeText={(text: string) => setName(text)}
        />
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
              bodyMedium
              onPress={() =>
                setShowPassword((isShowPassword) => !isShowPassword)
              }
            >
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          }
          secureTextEntry={!showPassword}
        />
      </View>

      <View flex bottom>
        <AppButton onPress={() => signUp(email, password, name)}>
          Sign Up
        </AppButton>

        <Text marginV-16 primaryColor bodyMediumSemibold center>
          Forgot you password?
        </Text>
      </View>
    </View>
  );
}

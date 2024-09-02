import { useState } from 'react';
import { useAuthContext } from '@/context/auth/AuthContext';
import { AppTextField } from '@/components/ui/AppTextField';
import { Text, View } from 'react-native-ui-lib';
import { AppButton } from '@/components/ui/AppButton';
import { Controller, useForm } from 'react-hook-form';
import {
  emailRule,
  minLengthFieldRule,
  passwordRule,
} from '@/constants/validationRules';

interface SignUpFormData {
  userName: string;
  email: string;
  password: string;
}

export default function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const { signUp } = useAuthContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: SignUpFormData) => {
    signUp(data.email, data.password, data.userName);
  };

  return (
    <View flex>
      <View>
        <Controller
          control={control}
          name="userName"
          rules={minLengthFieldRule('Name', 3)}
          render={({ field: { onChange, value } }) => (
            <AppTextField
              placeholder="Name"
              margins={{ 'marginB-16': true, 'marginT-32': true }}
              value={value}
              onChangeText={onChange}
              errorMessage={errors.userName?.message as string}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={emailRule}
          render={({ field: { onChange, value } }) => (
            <AppTextField
              placeholder="Email"
              margins={{ 'marginB-16': true }}
              value={value}
              onChangeText={onChange}
              errorMessage={errors.email?.message as string}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={passwordRule}
          render={({ field: { onChange, value } }) => (
            <AppTextField
              placeholder="Password"
              margins={{ 'marginB-16': true }}
              value={value}
              onChangeText={onChange}
              errorMessage={errors.password?.message as string}
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
          )}
        />
      </View>

      <View flex bottom>
        <AppButton
          modifiers={{ primary: true }}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          Sign Up
        </AppButton>

        <Text marginV-16 primaryColor bodyMediumSemibold center>
          Forgot you password?
        </Text>
      </View>
    </View>
  );
}

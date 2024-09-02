import { useState } from 'react';
import { useAuthContext } from '@/context/auth/AuthContext';
import { AppTextField } from '@/components/ui/AppTextField';
import { Text, View } from 'react-native-ui-lib';
import { AppButton } from '@/components/ui/AppButton';
import { Controller, useForm } from 'react-hook-form';
import { emailRule, passwordRule } from '@/constants/validationRules';

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignInScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuthContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: SignInFormData) => {
    signIn(data.email, data.password);
  };

  return (
    <View flex>
      <View>
        <Controller
          control={control}
          name="email"
          rules={emailRule}
          render={({ field: { onChange, value } }) => {
            return (
              <AppTextField
                placeholder="Email"
                margins={{ 'marginB-16': true, 'marginT-32': true }}
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message as string}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="password"
          rules={passwordRule}
          render={({ field: { onChange, value } }) => (
            <AppTextField
              placeholder="Password"
              margins={{ 'marginB-16': true }}
              onChangeText={onChange}
              value={value}
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
          Log In
        </AppButton>

        <Text marginV-16 primaryColor bodyMediumSemibold center>
          Forgot you password?
        </Text>
      </View>
    </View>
  );
}

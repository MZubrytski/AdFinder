import { Text } from 'react-native-ui-lib';
import AppSelect from './ui/AppSelect';
import { Controller, useForm } from 'react-hook-form';
import { AppButton } from './ui/AppButton';
import { GENDERS } from '@/constants/pickerData';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import { useAuthContext } from '@/context/auth/AuthContext';
import { AppDatePicker } from './ui/AppDatePicker';
import { PrivateInfoSchema } from '@/forms/privateInfoForm.schema';
import { removeEmptyValues } from '@/utils/objectFormatter';
import { PrivateInfoFormI } from '@/types/forms';

export const PrivateInfoForm = () => {
  const { getDBUser, dbUser } = useAuthContext();

  const { updateUser } = useUpdateUser();

  const { control, handleSubmit } = useForm<PrivateInfoFormI>({
    resolver: zodResolver(PrivateInfoSchema),
    defaultValues: {
      gender: dbUser?.gender,
      dateOfBirthday: null,
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: PrivateInfoFormI) => {
    if (!dbUser) return;
    await updateUser({ id: dbUser.uid, ...removeEmptyValues(data) });
    await getDBUser(dbUser.uid);
  };

  return (
    <>
      <Text>Select a Gender:</Text>
      <Controller
        control={control}
        name="gender"
        render={({ field: { onChange, value } }) => (
          <AppSelect
            options={GENDERS}
            onSelect={(item) => {
              onChange(item.value);
            }}
            label="Select a gender"
            value={value}
          />
        )}
      />
      <Text marginT-16>Date of Birthday:</Text>
      <Controller
        control={control}
        name="dateOfBirthday"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <AppDatePicker
            value={value}
            onChange={onChange}
            errorMessage={error?.message}
          />
        )}
      />

      <AppButton
        label="submit"
        onPress={handleSubmit(onSubmit)}
        modifiers={{ primary: true, 'marginV-16': true }}
      />
    </>
  );
};

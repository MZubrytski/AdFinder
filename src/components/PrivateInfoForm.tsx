import { Text } from 'react-native-ui-lib';
import AppSelect from './ui/AppSelect';
import { Controller, useForm } from 'react-hook-form';
import { AppButton } from './ui/AppButton';
import { GENDERS } from '@/constants/pickerData';
import { zodResolver } from '@hookform/resolvers/zod';
import { removeEmptyValues } from './../utils/functions';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import { DBUser } from '@/types/user';
import { useAuthContext } from '@/context/auth/AuthContext';
import { AppDatePicker } from './ui/AppDatePicker';
import { PrivateInfoSchema } from '@/forms/privateInfoForm.schema';

interface PrivateInfoFormI {
  dateOfBirthday: Date | null;
  gender: string;
}

export const PrivateInfoForm = ({ user }: { user: DBUser }) => {
  const { getDBUser } = useAuthContext();
  const { updateUser } = useUpdateUser();

  const { control, handleSubmit } = useForm<PrivateInfoFormI>({
    resolver: zodResolver(PrivateInfoSchema),
    defaultValues: {
      gender: user.gender,
      dateOfBirthday: null,
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: PrivateInfoFormI) => {
    await updateUser({ id: user.uid, ...removeEmptyValues(data) });
    await getDBUser(user.uid);
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

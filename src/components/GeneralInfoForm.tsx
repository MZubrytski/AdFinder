import { Text } from 'react-native-ui-lib';
import AppSelect from './ui/AppSelect';
import { Controller, useForm } from 'react-hook-form';
import { AppButton } from './ui/AppButton';
import { phoneMasks, zipCodeMasks } from '@/constants/masks';
import { COUNTRIES } from '@/constants/pickerData';
import { AppMaskInput } from './ui/AppMaskInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { Country } from '@/enums/country';
import { GeneralInfoSchema } from '@/forms/generalInfoForm.schema';
import { removeEmptyValues } from './../utils/functions';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import { DBUser } from '@/types/user';
import { useAuthContext } from '@/context/auth/AuthContext';

interface GeneralInfoFormI {
  country: Country;
  phone: string;
  postalCode: string;
}

export const GeneralInfoForm = ({ user }: { user: DBUser }) => {
  const { getDBUser } = useAuthContext();
  const { updateUser } = useUpdateUser();

  const { control, handleSubmit, watch, setValue } = useForm<GeneralInfoFormI>({
    resolver: zodResolver(GeneralInfoSchema),
    defaultValues: {
      country: user.country || Country.Belarus,
      phone: user.phone,
      postalCode: user.postalCode,
    },
    mode: 'onSubmit'
  });

  const selectedCountry = watch('country');

  const onSubmit = async (data: GeneralInfoFormI) => {
    await updateUser({ id: user.uid, ...removeEmptyValues(data) });
    await getDBUser(user.uid);
  };

  return (
    <>
      <Text>Select a Country:</Text>
      <Controller
        control={control}
        name="country"
        render={({ field: { onChange, value } }) => (
          <AppSelect
            options={COUNTRIES}
            onSelect={(item) => {
              onChange(item.value);
              setValue('phone', '');
              setValue('postalCode', '');
            }}
            label="Select a country"
            value={value}
          />
        )}
      ></Controller>
      <Text marginT-16>Mobile Phone:</Text>
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <AppMaskInput
            mask={phoneMasks[selectedCountry]}
            value={value}
            onChange={onChange}
            errorMessage={error?.message as string}
          />
        )}
      />

      <Text marginT-16>Postal Code:</Text>
      <Controller
        control={control}
        name="postalCode"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <AppMaskInput
            mask={zipCodeMasks[selectedCountry]}
            value={value}
            onChange={onChange}
            errorMessage={error?.message as string}
          />
        )}
      />

      <AppButton
        label="submit"
        onPress={handleSubmit(onSubmit)}
        modifiers={{ primary: true, 'marginV-16': true }}
      ></AppButton>
    </>
  );
};

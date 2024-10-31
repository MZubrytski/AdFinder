import { Country } from '@/enums/country';
import { GeneralInfoFormI } from '@/types/forms';

const phoneNumberLengthMap = {
  [Country.Poland]: 15,
  [Country.Belarus]: 18,
};

const postalCodeLengthMap = {
  [Country.Poland]: 6,
  [Country.Belarus]: 6,
};

export const phoneValidation = ({
  phone,
  country,
}: Omit<GeneralInfoFormI, 'postalCode'>) =>
  phone.length ? phone.length === phoneNumberLengthMap[country] : true;

export const phoneValidationMessage = () => {
  return {
    message: `Wrong phone number`,
    path: ['phone'],
  };
};

export const postalCodeValidation = ({
  postalCode,
  country,
}: Omit<GeneralInfoFormI, 'phone'>) =>
  postalCode.length ? postalCode.length === postalCodeLengthMap[country] : true;

export const postalCodeValidationMessage = () => {
  return {
    message: `Wrong postal code`,
    path: ['postalCode'],
  };
};

export const dateValidation = (date: Date | null | undefined) =>
  date ? date <= new Date() : true;

export const dateValidationMessage = () => ({
  message: 'Date of birth cannot be in the future',
});

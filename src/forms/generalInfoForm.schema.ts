import { Country } from '@/enums/country';
import { z } from 'zod';

const phoneNumberLengthMap = {
  [Country.Poland]: 15,
  [Country.Belarus]: 18,
};

const postalCodeLengthMap = {
  [Country.Poland]: 6,
  [Country.Belarus]: 6,
};

export const GeneralInfoSchema = z
  .object({
    country: z.enum([Country.Belarus, Country.Poland]),
    phone: z.string(),
    postalCode: z.string(),
  })
  .refine(
    ({ phone, country }) =>
      phone.length ? phone.length === phoneNumberLengthMap[country] : true,
    () => {
      return {
        message: `Wrong phone number`,
        path: ['phone'],
      };
    },
  )
  .refine(
    ({ postalCode, country }) =>
      postalCode.length
        ? postalCode.length === postalCodeLengthMap[country]
        : true,
    () => {
      return {
        message: `Wrong postal code`,
        path: ['postalCode'],
      };
    },
  );

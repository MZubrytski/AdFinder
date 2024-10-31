import { Country } from '@/enums/country';
import {
  phoneValidation,
  phoneValidationMessage,
  postalCodeValidation,
  postalCodeValidationMessage,
} from '@/utils/validations';
import { z } from 'zod';

export const GeneralInfoSchema = z
  .object({
    country: z.enum([Country.Belarus, Country.Poland]),
    phone: z.string(),
    postalCode: z.string(),
  })
  .refine(phoneValidation, phoneValidationMessage)
  .refine(postalCodeValidation, postalCodeValidationMessage);

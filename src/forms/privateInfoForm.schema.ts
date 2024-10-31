import { Gender } from '@/enums/genders';
import { dateValidation, dateValidationMessage } from '@/utils/validations';
import { z } from 'zod';

export const PrivateInfoSchema = z.object({
  gender: z.enum([Gender.Male, Gender.Female]),
  dateOfBirthday: z
    .date()
    .nullish()
    .refine(dateValidation, dateValidationMessage),
});

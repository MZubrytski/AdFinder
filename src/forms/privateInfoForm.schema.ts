import { Gender } from '@/enums/genders';
import { z } from 'zod';

export const PrivateInfoSchema = z.object({
  gender: z.enum([Gender.Male, Gender.Female]),
  dateOfBirthday: z
    .date()
    .nullish()
    .refine((date) => (date ? date <= new Date() : true), {
      message: 'Date of birth cannot be in the future',
    }),
});

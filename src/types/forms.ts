import { Country } from '@/enums/country';

export interface PrivateInfoFormI {
  dateOfBirthday: Date | null;
  gender: string;
}

export interface GeneralInfoFormI {
  country: Country;
  phone: string;
  postalCode: string;
}

import { Country } from '@/enums/country';

export interface DBUser {
  email: string;
  uid: string;
  userName: string;
  id: string;
  phone?: string;
  country?: Country;
  postalCode?: string;
  dateOfBirthday?: Date;
  gender?: string;
}

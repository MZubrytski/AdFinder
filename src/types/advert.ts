import { Timestamp } from 'firebase/firestore';

export interface Advert {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  created: Timestamp;
}

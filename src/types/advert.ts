import { Timestamp } from 'firebase/firestore';

export interface Advert {
  id: string;
  images: string[];
  title: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  created: Timestamp;
  userId: string;
  userName: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

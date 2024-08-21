import { Advert } from '../types/advert';
import { firebaseService } from './firebase.service';
import { storage } from '@/storage';

class AdvertsService {
  private collectionName = 'adverts';

  async getAdverts(): Promise<Advert[]> {
    const adverts = await firebaseService.getDocuments<Advert>(
      this.collectionName,
    );
    await storage.setItem('adverts', adverts);
    return adverts;
  }

  async getAdvert(id: string): Promise<Advert> {
    const adverts = await storage.getItem<Advert[]>('adverts');

    if (adverts?.length) {
      const advert = adverts.find((advert) => advert.id === id);

      if (advert) {
        return advert;
      }
    }

    return await firebaseService.getDocumentById(this.collectionName, id);
  }
}

export const advertsService = new AdvertsService();

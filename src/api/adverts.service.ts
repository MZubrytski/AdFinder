import { Advert } from '../types/advert';
import { firebaseService } from './firebase.service';

class AdvertsService {
  private collectionName = 'adverts';

  async getAdverts(): Promise<Advert[]> {
    return await firebaseService.getDocuments<Advert>(this.collectionName);
  }

  async getAdvert(id: string): Promise<Advert> {
    return await firebaseService.getDocumentById(this.collectionName, id);
  }
}

export const advertsService = new AdvertsService();

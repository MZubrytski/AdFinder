import { Advert } from '../types/advert';
import { firebaseService } from './firebase.service';

class AdvertsService {
  private collectionName = 'adverts';

  async getAdverts(): Promise<Advert[]> {
    const adverts = await firebaseService.getDocuments<Advert>(
      this.collectionName,
    );

    return adverts;
  }

  async getAdvert(id: string): Promise<Advert> {
    return await firebaseService.getDocumentById(this.collectionName, id);
  }

  async createAdvert(newAdvert: Advert, imagesPath: string[]): Promise<void> {
    const images = await firebaseService.uploadImages(imagesPath);

    await firebaseService.setDocument(this.collectionName, {
      ...newAdvert,
      images,
    });
  }
}

export const advertsService = new AdvertsService();

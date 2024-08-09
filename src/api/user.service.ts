import { User } from '../types/user';
import { firebaseService } from './firebase.service';

class UserService {
  private collectionName = 'users';

  async setNewUser(id: string, data: User): Promise<void> {
    await firebaseService.setDocumentWithId(this.collectionName, id, data);
  }
}

export const userService = new UserService();

import { DBUser } from '../types/user';
import { firebaseService } from './firebase.service';

class UserService {
  private collectionName = 'users';

  async setNewUser(id: string, data: DBUser): Promise<void> {
    await firebaseService.setDocumentWithId(this.collectionName, id, data);
  }

  async getUser(id: string): Promise<DBUser> {
    return await firebaseService.getDocumentById<DBUser>(
      this.collectionName,
      id,
    );
  }
}

export const userService = new UserService();

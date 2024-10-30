import { DBUser } from '../types/user';
import { firebaseService } from './firebase.service';

class UserService {
  private collectionName = 'users';

  async setNewUser(id: string, data: Omit<DBUser, 'id'>): Promise<void> {
    await firebaseService.setDocumentWithId(this.collectionName, id, data);
  }

  async getUser(id: string): Promise<DBUser> {
    return await firebaseService.getDocumentById<DBUser>(
      this.collectionName,
      id,
    );
  }

  async updateUser(id: string, userData: Partial<DBUser>): Promise<void> {
    return await firebaseService.updateDocument(
      this.collectionName,
      id,
      userData,
    );
  }
}

export const userService = new UserService();

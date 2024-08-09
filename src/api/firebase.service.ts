import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  setDoc,
  WithFieldValue,
} from 'firebase/firestore';
import { database } from '../../firebaseConfig';

class FirebaseService {
  async setDocumentWithId(
    collectionName: string,
    documentId: string,
    data: WithFieldValue<DocumentData>,
  ): Promise<void> {
    const documentRef = doc(database, collectionName, documentId);
    await setDoc(documentRef, data);
  }

  async getDocuments<T extends DocumentData & { id: string }>(
    collectionName: string,
  ): Promise<T[]> {
    const querySnapshot = await getDocs(collection(database, collectionName));

    return querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as T;
    });
  }

  async getDocumentById<T extends DocumentData & { id: string }>(
    collectionName: string,
    documentId: string,
  ): Promise<T> {
    const documentRef = doc(database, collectionName, documentId);
    const docSnapshot = await getDoc(documentRef);

    return { id: documentId, ...docSnapshot.data() } as T;
  }
}

export const firebaseService = new FirebaseService();

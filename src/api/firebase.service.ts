import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  WithFieldValue,
} from 'firebase/firestore';
import { database, filesStorage } from '../../firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

class FirebaseService {
  async setDocumentWithId(
    collectionName: string,
    documentId: string,
    data: WithFieldValue<DocumentData>,
  ): Promise<void> {
    try {
      const documentRef = doc(database, collectionName, documentId);
      await setDoc(documentRef, data);
    } catch (e) {
      console.log('Error while set document', e);
    }
  }

  async setDocument(
    collectionName: string,
    data: WithFieldValue<DocumentData>,
  ): Promise<void> {
    try {
      const documentRef = doc(collection(database, collectionName));
      await setDoc(documentRef, data);
    } catch (e) {
      console.log('Error while set document', e);
    }
  }

  async updateDocument(
    collectionName: string,
    documentId: string,
    data: WithFieldValue<DocumentData>,
  ): Promise<void> {
    try {
      const documentRef = doc(database, collectionName, documentId);
      await updateDoc(documentRef, data);
    } catch (e) {
      console.log('Error while update document', e);
    }
  }

  async deleteDocument(
    collectionName: string,
    documentId: string,
  ): Promise<void> {
    try {
      const documentRef = doc(database, collectionName, documentId);
      await deleteDoc(documentRef);
    } catch (e) {
      console.log('Error while delete document', e);
    }
  }

  async getDocuments<T extends DocumentData & { id: string }>(
    collectionName: string,
  ): Promise<T[]> {
    try {
      const querySnapshot = await getDocs(collection(database, collectionName));

      return querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as T;
      });
    } catch (e) {
      console.log('Error while get documents', e);
      return [];
    }
  }

  async getDocumentById<T extends DocumentData & { id: string }>(
    collectionName: string,
    documentId: string,
  ): Promise<T> {
    try {
      const documentRef = doc(database, collectionName, documentId);
      const docSnapshot = await getDoc(documentRef);

      return { id: documentId, ...docSnapshot.data() } as T;
    } catch (e) {
      console.log('Error while get documents', e);
      return {} as T;
    }
  }

  async uploadImages(imagesPath: string[]): Promise<string[]> {
    try {
      const imageUrls = await Promise.all(
        imagesPath.map(async (imagePath) => {
          const response = await fetch(imagePath);
          const blob = await response.blob();
          const filename = imagePath
            .substring(imagePath.lastIndexOf('/'))
            .replace('/', '');

          const imageRef = ref(filesStorage, filename);
          const result = await uploadBytes(imageRef, blob);

          const url = await getDownloadURL(result.ref);

          return url;
        }),
      );
      return imageUrls;
    } catch (e) {
      console.log('error', e);
      return [];
    }
  }
}

export const firebaseService = new FirebaseService();

import { ReactNativeAsyncStorage } from './ReactNativeAsyncStorage';
import { StorageProvider } from './StorageProvider.inteface';

export class StorageBuilder {
  build<T>(): StorageProvider<T> {
    const storageType = process.env.EXPO_PUBLIC_STORAGE;

    switch (storageType) {
      case 'react-native-async-storage':
        return new ReactNativeAsyncStorage();
      default:
        throw new Error('Unsupported storage type');
    }
  }
}
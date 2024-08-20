import { MMKVStorage } from './MMKVStorage';
import { ReactNativeAsyncStorage } from './ReactNativeAsyncStorage';
import { StorageProvider } from './StorageProvider.interface';

export class StorageBuilder {
  build<T>(): StorageProvider<T> {
    const storageType = process.env.EXPO_PUBLIC_STORAGE;

    switch (storageType) {
      case 'react-native-async-storage':
        return new ReactNativeAsyncStorage();
      case 'mmkv':
        return new MMKVStorage();
      default:
        throw new Error('Unsupported storage type');
    }
  }
}

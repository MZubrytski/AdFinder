import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageProvider } from './StorageProvider.inteface';

export class ReactNativeAsyncStorage<T> implements StorageProvider<T> {
  async setItem(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  async getItem<T>(key: string): Promise<T | null> {
    const storageItem = await AsyncStorage.getItem(key);
    return storageItem ? JSON.parse(storageItem) : null;
  }
}

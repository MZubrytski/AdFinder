import { StorageProvider } from './StorageProvider.interface';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export class MMKVStorage<T> implements StorageProvider<T> {
  async setItem(key: string, value: T): Promise<void> {
    await storage.set(key, JSON.stringify(value));
  }

  async getItem<T>(key: string): Promise<T | null> {
    const storageItem = await storage.getString(key);
    return storageItem ? JSON.parse(storageItem) : null;
  }
}

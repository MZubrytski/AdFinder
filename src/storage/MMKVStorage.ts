import { StorageProvider } from './StorageProvider.interface';
import { MMKV } from 'react-native-mmkv';

export class MMKVStorage<T> implements StorageProvider<T> {
  private storage: MMKV;

  constructor() {
    this.storage = new MMKV();
  }
  async setItem(key: string, value: T): Promise<void> {
    await this.storage.set(key, JSON.stringify(value));
  }

  async getItem<T>(key: string): Promise<T | null> {
    const storageItem = await this.storage.getString(key);
    return storageItem ? JSON.parse(storageItem) : null;
  }
}

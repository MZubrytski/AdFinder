export interface StorageProvider<T> {
  setItem(key: string, value: T): Promise<void>;
  getItem<T>(key: string): Promise<T | null>;
}

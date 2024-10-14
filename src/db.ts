import * as SQLite from 'expo-sqlite';
import { Advert, SQLiteAdvert } from './types/advert';
import { advertsService } from './api/adverts.service';
import { Timestamp } from 'firebase/firestore';
import { fileSystemService } from './services/file-system.service';

export const DATABASE_NAME = 'adverts.db';

const db = SQLite.openDatabaseSync(DATABASE_NAME);

const ADVERTS_LIMIT = 5;
export class SQLiteDB {
  static async migrateDbIfNeeded() {
    const DATABASE_VERSION = 1;

    let result = await db.getFirstAsync<{ user_version: number }>(
      'PRAGMA user_version',
    );

    let currentDbVersion = result?.user_version ?? 0;
    if (currentDbVersion >= DATABASE_VERSION) {
      return;
    }
    if (currentDbVersion === 0) {
      await db.execAsync(`
  PRAGMA journal_mode = 'wal';
  CREATE TABLE adverts (
    id TEXT PRIMARY KEY NOT NULL, 
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMBER NOT NULL,
    currency TEXT NOT NULL,
    created NUMBER NOT NULL,
    userId TEXT NOT NULL,
    userName TEXT NOT NULL,
    images TEXT
  );
  CREATE TABLE newAdverts (
    id TEXT PRIMARY KEY NOT NULL, 
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMBER NOT NULL,
    currency TEXT NOT NULL,
    created NUMBER NOT NULL,
    userId TEXT NOT NULL,
    userName TEXT NOT NULL,
    images TEXT
  );
  `);

      currentDbVersion = 1;
      await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    }
  }

  static async createAdvert(
    advert: Advert,
    imagesPath: string[],
  ): Promise<void> {
    try {
      await db.runAsync(
        'INSERT INTO newAdverts (id, title, description, category, price, currency, created, userId, userName, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        advert.id,
        advert.title,
        advert.description,
        advert.category,
        advert.price,
        advert.currency,
        Number((advert.created as Timestamp).toDate()),
        advert.userId,
        advert.userName,
        JSON.stringify(imagesPath),
      );
    } catch (error) {
      console.log('Error when create new ads to the database:', error);
    }
  }

  static async getNewAdverts(): Promise<Advert[]> {
    try {
      const allRows = await db.getAllAsync<SQLiteAdvert>(
        'SELECT * FROM newAdverts',
      );
      const adverts = [];

      for (const advert of allRows) {
        adverts.push({
          ...advert,
          images: JSON.parse(advert.images),
        });
      }

      return adverts;
    } catch (error) {
      console.error('Error when getting new adverts:', error);
      return [];
    }
  }

  static async createAdvertFromOfflineMode(adverts: Advert[]): Promise<void> {
    try {
      await db.runAsync('DELETE FROM newAdverts;');

      for (const advert of adverts) {
        delete advert.id;

        await advertsService.createAdvert(
          { ...advert, created: Timestamp.now() },
          advert.images,
        );
      }
    } catch (error) {
      console.log('Error when create new ads from the database:', error);
    }
  }

  static async saveExistingAdverts(adverts: Advert[]) {
    const lastAdverts = adverts.slice(0, ADVERTS_LIMIT);
    await db.runAsync('DELETE FROM adverts;');

    try {
      await db.withTransactionAsync(async () => {
        for (const advert of lastAdverts) {
          const images: string[] =
            await fileSystemService.saveFirebaseImagesLocally(advert.images);

          await db.runAsync(
            'INSERT OR REPLACE INTO adverts (id, title, description, category, price, currency, created, userId, userName, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
              advert.id,
              advert.title,
              advert.description,
              advert.category,
              advert.price,
              advert.currency,
              Number((advert.created as Timestamp).toDate()),
              advert.userId,
              advert.userName,
              JSON.stringify(images),
            ],
          );
        }
      });
    } catch (error) {
      console.error('Error when adding ads to the database:', error);
    }
  }

  static async getAdverts(): Promise<Advert[]> {
    try {
      const allRows = await db.getAllAsync<SQLiteAdvert>(
        'SELECT * FROM adverts',
      );
      const adverts = [];

      for (const advert of allRows) {
        adverts.push({
          ...advert,
          images: JSON.parse(advert.images),
        });
      }

      return adverts;
    } catch (error) {
      console.error('Error when getting adverts:', error);
      return [];
    }
  }

  static async getAdvert(advertId: string): Promise<Advert> {
    try {
      const advert = (await db.getFirstAsync<SQLiteAdvert>(
        'SELECT * FROM adverts WHERE id = ?',
        advertId,
      )) as SQLiteAdvert;

      return {
        ...advert,
        images: JSON.parse(advert.images),
      };
    } catch (error) {
      console.log('Error when getting ad:', error);
      return {} as Advert;
    }
  }

  static async deleteAdvert(advertId: string): Promise<void> {
    try {
      await db.runAsync('DELETE FROM adverts WHERE id = ?', advertId);
    } catch (error) {
      console.error(`Error when deleting advert with id ${advertId}:`, error);
    }
  }
}

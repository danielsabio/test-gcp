import { connection } from './connection';

export class RedisDB {
  static async get<T = unknown>(key: string): Promise<T | null> {
    const data = await connection.get(key);

    if (!data) return null;

    try {
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  static async set<T = unknown>(key: string, data: T, expiration = 600): Promise<void> {
    if (!expiration) {
      await connection.set(key, JSON.stringify(data));
    } else {
      await connection.setex(key, expiration, JSON.stringify(data));
    }
  }
}

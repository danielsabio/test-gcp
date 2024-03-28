import qs from 'qs';

import { RedisDB } from '../../infra/redis';

interface QueryOptions<T> {
  queryKey: string;
  queryFn: () => Promise<T>;
  queryParams?: Record<string, unknown>;
  expiration?: number;
  revalidate?: boolean;
}

export const query = async <T = unknown>(options: QueryOptions<T>): Promise<T> => {
  const { queryKey, queryFn, queryParams = {}, expiration = 600, revalidate = false } = options;

  const key = `query:${queryKey}:${qs.stringify(queryParams, {
    skipNulls: true,
    sort: (a, b) => a.localeCompare(b),
  })}`;

  if (!revalidate) {
    const data = await RedisDB.get<T>(key);
    if (data) return data;
  }

  const data = await queryFn();

  await RedisDB.set(key, JSON.stringify(data), expiration);

  return data;
};

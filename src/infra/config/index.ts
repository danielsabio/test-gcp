import { z } from 'zod';

export const config = z
  .object({
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.enum(['test', 'development', 'staging', 'production']),
    REDIS_HOST: z.string(),
    REDIS_PORT: z.coerce.number(),
  })
  .transform((data) => ({
    ...data,
    isDevelopment: data.NODE_ENV === 'development',
  }))
  .parse(process.env);

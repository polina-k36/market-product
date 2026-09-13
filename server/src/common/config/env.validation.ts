import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(5000),

  DATABASE_URL: z.string().min(1),
  DATABASE_HOST: z.string().min(1),
  DATABASE_PORT: z.coerce.number().int().min(1).max(65535).default(3306),
  DATABASE_USER: z.string().min(1),
  DATABASE_PASSWORD: z.string().min(1),
  DATABASE_NAME: z.string().min(1),

  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),

  BASE_URL_CLIENT: z.string().url(),

  GOOGLE_CLIENT_ID: z.string().min(1),

  EMAIL_PORT: z.coerce.number().int().min(1).max(65535).default(587),
  EMAIL_HOST: z.string().min(1).default('smtp.gmail.com'),
  EMAIL_USER: z.string().email(),
  EMAIL_PASSWORD: z.string().min(1),
});

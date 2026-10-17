import { z } from 'zod';

const portSchema = z.coerce
  .number()
  .int('Port must be an integer')
  .min(1, 'Port must be at least 1')
  .max(65535, 'Port must not exceed 65535');

const httpsUrlSchema = z
  .string()
  .url('Must be a valid URL')
  .refine((value) => value.startsWith('https://'), 'URL must use HTTPS');

const httpUrlSchema = z
  .string()
  .url('Must be a valid URL')
  .refine((value) => value.startsWith('http://'), 'URL must use HTTPS');

const requiredStringSchema = z.string().trim().min(1, 'Field is required');

export const envSchema = z.object({
  PORT: portSchema.default(5000),

  BASE_URL_CLIENT: httpUrlSchema,

  DATABASE_URL: requiredStringSchema,
  DATABASE_HOST: requiredStringSchema,
  DATABASE_PORT: portSchema.default(3306),
  DATABASE_USER: requiredStringSchema,
  DATABASE_PASSWORD: z.string().min(1, 'DATABASE_PASSWORD is required'),
  DATABASE_NAME: requiredStringSchema,

  JWT_ACCESS_SECRET: z
    .string()
    .min(32, 'JWT_ACCESS_SECRET must contain at least 32 characters'),

  JWT_REFRESH_SECRET: z
    .string()
    .min(32, 'JWT_REFRESH_SECRET must contain at least 32 characters')
    .refine(
      (value) => value !== process.env.JWT_ACCESS_SECRET,
      'JWT_REFRESH_SECRET must differ from JWT_ACCESS_SECRET',
    ),

  GOOGLE_CLIENT_ID: requiredStringSchema,

  EMAIL_PORT: portSchema.default(587),
  EMAIL_HOST: requiredStringSchema.default('smtp.gmail.com'),
  EMAIL_USER: z.string().email('EMAIL_USER must be a valid email address'),
  EMAIL_PASSWORD: z.string().min(1, 'EMAIL_PASSWORD is required'),

  S3_ENDPOINT: httpsUrlSchema,

  S3_REGION: z
    .string()
    .trim()
    .min(1, 'S3_REGION is required')
    .regex(
      /^[a-z0-9-]+$/,
      'S3_REGION may contain only lowercase letters, numbers and hyphens',
    ),

  S3_BUCKET: z
    .string()
    .min(3, 'S3_BUCKET must contain at least 3 characters')
    .max(63, 'S3_BUCKET must contain at most 63 characters')
    .regex(
      /^[a-z0-9][a-z0-9.-]*[a-z0-9]$/,
      'S3_BUCKET must use lowercase letters, numbers, dots or hyphens and start/end with a letter or number',
    )
    .refine(
      (value) => !/(\d{1,3}\.){3}\d{1,3}/.test(value),
      'S3_BUCKET must not be formatted as an IP address',
    ),

  S3_ACCESS_KEY_ID: z.string().trim().min(1, 'S3_ACCESS_KEY_ID is required'),

  S3_SECRET_ACCESS_KEY: z.string().min(1, 'S3_SECRET_ACCESS_KEY is required'),

  S3_PUBLIC_URL: httpsUrlSchema.transform((value) => value.replace(/\/+$/, '')),
});

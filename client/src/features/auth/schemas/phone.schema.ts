import { z } from 'zod';

export const phoneSchema = z
  .string()
  .regex(/^(?:\+7|8)\d{10}$/, 'Введите корректный номер телефона');

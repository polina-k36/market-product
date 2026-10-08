import { z } from 'zod';

export const phoneSchema = z
  .string()
  .regex(
    /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
    'Введите корректный номер телефона',
  );

import { z } from 'zod';
import { phoneSchema } from './phone.schema';

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Это поле обязательно')
      .max(256, 'Имя не должно превышать 256 символов.'),
    login: z.union([
      z.email({ error: 'Введите корректный email или номер телефон' }),
      phoneSchema,
    ]),
    password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

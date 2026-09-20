import { z } from 'zod';
import { phoneSchema } from './phone.schema';

export const loginSchema = z.object({
  login: z.union([
    z.email({ error: 'Введите корректный email или номер телефон' }),
    phoneSchema,
  ]),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

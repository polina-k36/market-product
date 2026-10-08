import { phoneSchema } from '@/features/auth/schemas/phone.schema';
import { z } from 'zod';

export const editUserInfoSchema = z.object({
  name: z.string().min(1, 'Укажите имя').max(255, 'Имя слишком длинное'),
  email: z
    .union([z.email('Введите корректный email'), z.literal('')])
    .transform((value) => (value === '' ? null : value)),
  phone: z
    .union([phoneSchema, z.literal('')])
    .transform((value) => (value === '' ? null : value)),
});

export type EditUserInfoFormInput = z.input<typeof editUserInfoSchema>;
export type EditUserInfoFormValues = z.output<typeof editUserInfoSchema>;

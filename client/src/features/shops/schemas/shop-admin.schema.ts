import { phoneSchema } from '@/features/auth/schemas/phone.schema';
import { z } from 'zod';

export const shopAdminSchema = z.object({
  city: z
    .string()
    .trim()
    .min(1, 'Укажите город')
    .max(200, 'Название города слишком длинное'),
  street: z
    .string()
    .trim()
    .min(1, 'Укажите улицу')
    .max(200, 'Название улицы слишком длинное'),
  house: z
    .string()
    .trim()
    .min(1, 'Укажите номер дома')
    .max(20, 'Номер дома слишком длинный'),
  phone: phoneSchema,
});

export type ShopAdminFormValues = z.infer<typeof shopAdminSchema>;

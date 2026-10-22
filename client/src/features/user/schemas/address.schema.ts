import { z } from 'zod';

export const addressSchema = z.object({
  city: z
    .string()
    .min(1, 'Укажите город')
    .max(255, 'Название города слишком длинное'),
  street: z
    .string()
    .min(1, 'Укажите улицу')
    .max(255, 'Название улицы слишком длинное')
    .refine(
      (value) => /(?:ул\.?|улица|проспект|пр-т|площадь|пл\.)\s+/i.test(value),
      'Укажите тип улицы: ул., проспект или площадь',
    ),
  house: z
    .string()
    .min(1, 'Укажите номер дома')
    .max(20, 'Номер дома слишком длинный'),
  apartment: z
    .union([
      z.string().max(20, 'Номер квартиры слишком длинный'),
      z.literal(''),
    ])
    .transform((value) => (value === '' ? null : value)),
  comment: z.string(),
});

export type AddressFormInput = z.input<typeof addressSchema>;
export type AddressFormValues = z.output<typeof addressSchema>;

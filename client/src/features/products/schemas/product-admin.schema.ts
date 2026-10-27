import { z } from 'zod';

export const productAdminSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Укажите название товара')
    .max(255, 'Название слишком длинное'),
  description: z
    .string()
    .trim()
    .min(1, 'Укажите описание товара')
    .max(1000, 'Описание слишком длинное'),
  composition: z
    .string()
    .trim()
    .min(1, 'Укажите состав товара')
    .max(1000, 'Состав слишком длинный'),
  price: z
    .string()
    .min(1, 'Укажите цену')
    .transform(Number)
    .pipe(
      z
        .number()
        .finite('Введите корректную цену')
        .min(0, 'Цена не может быть отрицательной')
        .refine((value) => Math.round(value * 100) === value * 100, {
          message: 'Допускается максимум два знака после запятой',
        }),
    ),
  categoryId: z
    .string()
    .min(1, 'Выберите категорию')
    .transform(Number)
    .pipe(z.number().int().min(1)),
  unitId: z
    .string()
    .min(1, 'Выберите единицу измерения')
    .transform(Number)
    .pipe(z.number().int().min(1)),
  ndsId: z
    .string()
    .min(1, 'Выберите ставку НДС')
    .transform(Number)
    .pipe(z.number().int().min(1)),
});

export type ProductAdminFormInput = z.input<typeof productAdminSchema>;
export type ProductAdminFormValues = z.output<typeof productAdminSchema>;

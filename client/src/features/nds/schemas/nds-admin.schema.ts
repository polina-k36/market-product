import { z } from 'zod';

export const ndsAdminSchema = z.object({
  rate: z
    .string()
    .min(1, 'Укажите ставку')
    .transform(Number)
    .pipe(
      z
        .number()
        .finite('Введите корректную ставку')
        .min(0, 'Ставка не может быть отрицательной')
        .max(100, 'Ставка не может быть больше 100'),
    ),
  titleRate: z
    .string()
    .trim()
    .min(1, 'Введите название ставки НДС')
    .max(150, 'Название не должно превышать 150 символов'),
});

export type NdsAdminFormInput = z.input<typeof ndsAdminSchema>;
export type NdsAdminFormValues = z.output<typeof ndsAdminSchema>;

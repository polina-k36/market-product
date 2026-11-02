import { z } from 'zod';

export const unitAdminSchema = z.object({
  shortTitle: z
    .string()
    .trim()
    .min(1, 'Введите краткое название единицы измерения')
    .max(10, 'Краткое название не должно превышать 10 символов'),

  fullTitle: z
    .string()
    .trim()
    .min(1, 'Введите полное название единицы измерения')
    .max(45, 'Полное название не должно превышать 45 символов'),
});

export type UnitAdminFormValues = z.infer<typeof unitAdminSchema>;

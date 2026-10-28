import { z } from 'zod';

export const categoryAdminSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Укажите название категории')
    .max(150, 'Название категории слишком длинное'),
});

export type CategoryAdminFormValues = z.infer<typeof categoryAdminSchema>;

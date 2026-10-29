import { z } from 'zod';

export const supplierAdminSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Укажите название поставщика')
    .max(255, 'Название слишком длинное'),
});

export type SupplierAdminFormValues = z.infer<typeof supplierAdminSchema>;

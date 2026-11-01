import { z } from 'zod';

export const paymentMethodAdminSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Введите название способа оплаты')
    .max(150, 'Название не должно превышать 150 символов'),
});

export type PaymentMethodAdminFormValues = z.infer<
  typeof paymentMethodAdminSchema
>;

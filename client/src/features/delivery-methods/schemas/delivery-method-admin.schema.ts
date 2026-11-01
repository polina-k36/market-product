import { z } from 'zod';

export const deliveryMethodAdminSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Введите название способа доставки')
    .max(150, 'Название не должно превышать 150 символов'),
});

export type DeliveryMethodAdminFormValues = z.infer<
  typeof deliveryMethodAdminSchema
>;

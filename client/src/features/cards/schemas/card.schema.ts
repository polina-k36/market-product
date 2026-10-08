import { z } from 'zod';

export const cardSchema = z.object({
  number: z
    .string()
    .trim()
    .min(1, 'Укажите номер карты')
    .transform((value) => value.replace(/\s/g, ''))
    .refine((value) => /^\d{16}$/.test(value), {
      message: 'Номер карты должен содержать 16 цифр',
    }),

  date: z
    .string()
    .trim()
    .min(1, 'Укажите срок действия карты')
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
      message: 'Введите срок в формате ММ/ГГ',
    })
    .refine(
      (value) => {
        const [month, year] = value.split('/').map(Number);

        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear() % 100;

        return (
          year > currentYear || (year === currentYear && month >= currentMonth)
        );
      },
      {
        message: 'Срок действия карты истёк',
      },
    ),

  cvc: z
    .string()
    .trim()
    .regex(/^\d{3}$/, {
      message: 'CVC должен содержать 3 цифры',
    }),
});

export type CardFormValues = z.infer<typeof cardSchema>;

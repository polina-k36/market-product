import { Controller, useForm } from 'react-hook-form';
import { cardSchema, type CardFormValues } from '../schemas/card.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/ui/inputs/Input';
import FieldError from '@/features/auth/components/FieldError';
import { Calendar, CreditCard, Lock } from 'lucide-react';
import MaskedInput from '@/components/ui/inputs/MaskedInput';
import { useCreteUserCard } from '../hooks/use-create-user-card';
import type { IUserCard } from '../types/card.types';

interface IPaymentCardFormProps {
  onSubmitForm?: (data: IUserCard) => void;
}

const PaymentCardForm = ({ onSubmitForm }: IPaymentCardFormProps) => {
  const {
    register,
    handleSubmit,
    getFieldState,
    control,
    reset: resetForm,
    formState: { errors },
  } = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
  });

  const { mutate: createCard } = useCreteUserCard();

  const onSubmit = (data: CardFormValues) => {
    const [monthStr, yearStr] = data.date.split('/');

    const expireMonth = Number(monthStr);
    const expireYear = Number(`20${yearStr}`);

    if (
      !/^\d{2}\/\d{2}$/.test(data.date) ||
      expireMonth < 1 ||
      expireMonth > 12
    ) {
      return;
    }
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    if (
      expireYear < currentYear ||
      (expireYear === currentYear && expireMonth < currentMonth)
    ) {
      return; //FIXME: подумать над отправкой ошибок или объектов для сообщений
    }

    createCard(
      {
        expireMonth,
        expireYear,
        cardLast4: data.number.replace(/\s/g, '').slice(-4),
      },
      {
        onSuccess: (data) => {
          onSubmitForm?.(data);
          resetForm();
        },
      },
    );
  };

  return (
    <>
      <form
        id="user-card-form"
        className="mt-6 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Номер карты
          </label>
          <Controller
            name="number"
            control={control}
            render={({ field }) => (
              <MaskedInput
                {...field}
                mask="0000 0000 0000 0000"
                placeholder="0000 0000 0000 0000"
                icon={CreditCard}
                value={field.value}
                onAccept={(value) => field.onChange(value)}
              />
            )}
          />
          <FieldError message={errors.number?.message} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-secondary">
              Срок действия
            </label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <MaskedInput
                  {...field}
                  mask="00/00"
                  placeholder="00/00"
                  icon={Calendar}
                  value={field.value}
                  onAccept={(value) => field.onChange(value)}
                />
              )}
            />
            <FieldError message={errors.date?.message} />
          </div>
          <div>
            {/* FIXME: изменить плейсхолдер*/}
            <label className="mb-1.5 block text-xs font-medium text-text-secondary">
              CVC / CVV
            </label>
            <Input
              icon={Lock}
              type="password"
              placeholder="..."
              maxLength={3}
              {...register('cvc')}
              valid={
                getFieldState('cvc').isTouched
                  ? !getFieldState('cvc').invalid
                  : undefined
              }
            />
            <FieldError message={errors.cvc?.message} />
          </div>
        </div>
      </form>
    </>
  );
};

export default PaymentCardForm;

import { Controller, useForm } from 'react-hook-form';
import { cardSchema, type CardFormValues } from '../schemas/card.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/ui/inputs/Input';
import FieldError from '@/features/auth/components/FieldError';
import { Calendar, CreditCard, Lock } from 'lucide-react';
import MaskedInput from '@/components/ui/inputs/MaskedInput';

interface IPaymentCardFormProps {
  onSubmitData: (data: CardFormValues) => void;
}

const PaymentCardForm = ({ onSubmitData }: IPaymentCardFormProps) => {
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

  const onSubmit = (data: CardFormValues) => {
    onSubmitData(data);
    resetForm();
  };

  return (
    <>
      <form
        id="address-form"
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

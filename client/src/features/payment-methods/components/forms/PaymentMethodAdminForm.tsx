import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WalletCards } from 'lucide-react';
import Input from '@/components/ui/inputs/Input';
import FieldError from '@/features/auth/components/FieldError';
import FormError from '@/features/auth/components/FormError';
import {
  paymentMethodAdminSchema,
  type PaymentMethodAdminFormValues,
} from '../../schemas/payment-method-admin.schema';
import { usePaymentMethod } from '../../hooks/use-payment-method';
import { useUpdatePaymentMethod } from '../../hooks/use-update-payment-method';
import { useCreatePaymentMethod } from '../../hooks/use-create-payment-method';
import { useNotificationStore } from '@/stores/notification/notification.store';
import { useModalStore } from '@/stores/modal/modal.store';

interface IPaymentMethodAdminFormProps {
  paymentMethodId?: number;
  serverError?: string;
  onCloseError?: () => void;
}

const PaymentMethodAdminForm = ({
  paymentMethodId,
  serverError,
  onCloseError,
}: IPaymentMethodAdminFormProps) => {
  const { data: paymentMethod } = usePaymentMethod(paymentMethodId);
  const { mutate: updatePaymentMethod } = useUpdatePaymentMethod(
    paymentMethodId ?? -1,
  );
  const { mutate: createPaymentMethod } = useCreatePaymentMethod();
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );
  const closeModal = useModalStore((state) => state.closeModal);

  const {
    register,
    handleSubmit,
    getFieldState,
    reset,
    formState: { errors },
  } = useForm<PaymentMethodAdminFormValues>({
    resolver: zodResolver(paymentMethodAdminSchema),
    defaultValues: {
      title: '',
    },
  });

  useEffect(() => {
    reset({
      title: paymentMethod?.data.title ?? '',
    });
  }, [paymentMethod, reset]);

  const onSubmit = (data: PaymentMethodAdminFormValues) => {
    if (paymentMethodId) {
      updatePaymentMethod(data, {
        onSuccess: (response) => {
          addNotification({
            type: 'success',
            title: 'Обновление способа оплаты',
            description: `Способ оплаты #${response.data.id} успешно обновлен`,
            duration: 3000,
          });
          closeModal();
          reset({ title: '' });
        },
        onError: () => {
          addNotification({
            type: 'error',
            title: 'Ошибка обновления способа оплаты',
            description: 'Не удалось обновить способ оплаты',
            duration: 3000,
          });
        },
      });
    } else {
      createPaymentMethod(data, {
        onSuccess: (response) => {
          addNotification({
            type: 'success',
            title: 'Добавление способа оплаты',
            description: `Способ оплаты #${response.data.id} успешно добавлен`,
            duration: 3000,
          });
          closeModal();
          reset({ title: '' });
        },
        onError: () => {
          addNotification({
            type: 'error',
            title: 'Ошибка добавления способа оплаты',
            description: 'Не удалось добавить способ оплаты',
            duration: 3000,
          });
        },
      });
    }
  };

  const getValid = (field: keyof PaymentMethodAdminFormValues) => {
    const state = getFieldState(field);
    return state.isTouched ? !state.invalid : undefined;
  };

  return (
    <>
      {serverError && (
        <FormError message={serverError} onClose={onCloseError ?? (() => {})} />
      )}

      <form
        id="payment-method-admin-form"
        className="mt-6 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Название способа оплаты
          </label>
          <Input
            icon={WalletCards}
            type="text"
            placeholder="Банковская карта"
            {...register('title')}
            valid={getValid('title')}
          />
          <FieldError message={errors.title?.message} />
        </div>
      </form>
    </>
  );
};

export default PaymentMethodAdminForm;

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WalletCards } from 'lucide-react';
import Input from '@/components/ui/inputs/Input';
import FieldError from '@/features/auth/components/FieldError';
import FormError from '@/features/auth/components/FormError';
import {
  deliveryMethodAdminSchema,
  type DeliveryMethodAdminFormValues,
} from '../../schemas/delivery-method-admin.schema';
import { useDeliveryMethod } from '../../hooks/use-delivery-method';
import { useUpdateDeliveryMethod } from '../../hooks/use-update-delivery-method';
import { useCreateDeliveryMethod } from '../../hooks/use-create-delivery-method';
import { useNotificationStore } from '@/stores/notification/notification.store';
import { useModalStore } from '@/stores/modal/modal.store';

interface IDeliveryMethodAdminFormProps {
  deliveryMethodId?: number;
  serverError?: string;
  onCloseError?: () => void;
}

const DeliveryMethodAdminForm = ({
  deliveryMethodId,
  serverError,
  onCloseError,
}: IDeliveryMethodAdminFormProps) => {
  const { data: deliveryMethod } = useDeliveryMethod(deliveryMethodId);
  const { mutate: updateDeliveryMethod } = useUpdateDeliveryMethod(
    deliveryMethodId ?? -1,
  );
  const { mutate: createDeliveryMethod } = useCreateDeliveryMethod();
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
  } = useForm<DeliveryMethodAdminFormValues>({
    resolver: zodResolver(deliveryMethodAdminSchema),
    defaultValues: {
      title: '',
    },
  });

  useEffect(() => {
    reset({
      title: deliveryMethod?.title ?? '',
    });
  }, [deliveryMethod, reset]);

  const onSubmit = (data: DeliveryMethodAdminFormValues) => {
    if (deliveryMethodId) {
      updateDeliveryMethod(data, {
        onSuccess: (data) => {
          addNotification({
            type: 'success',
            title: 'Обновление способа доставки',
            description: `Способ доставки #${data.id} успешно обновлен`,
            duration: 3000,
          });
          closeModal();
          reset({ title: '' });
        },
        onError: () => {
          addNotification({
            type: 'error',
            title: 'Ошибка обновления способа доставки',
            description: 'Не удалось обновить способ доставки',
            duration: 3000,
          });
        },
      });
    } else {
      createDeliveryMethod(data, {
        onSuccess: (data) => {
          addNotification({
            type: 'success',
            title: 'Добавление способа доставки',
            description: `Способ доставки #${data.id} успешно добавлен`,
            duration: 3000,
          });
          closeModal();
          reset({ title: '' });
        },
        onError: () => {
          addNotification({
            type: 'error',
            title: 'Ошибка добавления способа доставки',
            description: 'Не удалось добавить способ доставки',
            duration: 3000,
          });
        },
      });
    }
  };

  const getValid = (field: keyof DeliveryMethodAdminFormValues) => {
    const state = getFieldState(field);
    return state.isTouched ? !state.invalid : undefined;
  };

  return (
    <>
      {serverError && (
        <FormError message={serverError} onClose={onCloseError ?? (() => {})} />
      )}

      <form
        id="delivery-method-admin-form"
        className="mt-6 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Название способа доставки
          </label>
          <Input
            icon={WalletCards}
            type="text"
            placeholder="Курьерская доставка"
            {...register('title')}
            valid={getValid('title')}
          />
          <FieldError message={errors.title?.message} />
        </div>
      </form>
    </>
  );
};

export default DeliveryMethodAdminForm;

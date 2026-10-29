import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Truck } from 'lucide-react';
import Input from '@/components/ui/inputs/Input';
import FieldError from '@/features/auth/components/FieldError';
import FormError from '@/features/auth/components/FormError';
import {
  supplierAdminSchema,
  type SupplierAdminFormValues,
} from '../../schemas/supplier-admin.schema';
import { useSupplier } from '../../hooks/use-supplier';
import { useUpdateSupplier } from '../../hooks/use-update-supplier';
import { useCreateSupplier } from '../../hooks/use-create-supplier';
import { useNotificationStore } from '@/stores/notification/notification.store';
import { useModalStore } from '@/stores/modal/modal.store';

interface ISupplierAdminFormProps {
  supplierId?: number;
  serverError?: string;
  onCloseError?: () => void;
}

const SupplierAdminForm = ({
  supplierId,
  serverError,
  onCloseError,
}: ISupplierAdminFormProps) => {
  const { data: supplier } = useSupplier(supplierId);
  const { mutate: updateSupplier } = useUpdateSupplier(supplierId ?? -1);
  const { mutate: createSupplier } = useCreateSupplier();
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
  } = useForm<SupplierAdminFormValues>({
    resolver: zodResolver(supplierAdminSchema),
    defaultValues: {
      title: '',
    },
  });

  useEffect(() => {
    reset({
      title: supplier?.title ?? '',
    });
  }, [supplier, reset]);

  const onSubmit = (data: SupplierAdminFormValues) => {
    if (supplierId) {
      updateSupplier(data, {
        onSuccess: (data) => {
          addNotification({
            type: 'success',
            title: 'Обновление поставщика',
            description: `Поставщик #${data.id} успешно обновлен`,
            duration: 3000,
          });
          closeModal();
          reset({ title: '' });
        },
        onError: () => {
          addNotification({
            type: 'error',
            title: 'Ошибка обновления поставщика',
            description: 'Поставщика не удалось обновить',
            duration: 3000,
          });
        },
      });
    } else {
      createSupplier(data, {
        onSuccess: (data) => {
          addNotification({
            type: 'success',
            title: 'Добавление поставщика',
            description: `Поставщик #${data.id} успешно добавлен`,
            duration: 3000,
          });
          closeModal();
          reset({ title: '' });
        },
        onError: () => {
          addNotification({
            type: 'error',
            title: 'Ошибка добавления поставщика',
            description: 'Поставщика не удалось добавить',
            duration: 3000,
          });
        },
      });
    }
  };

  const getValid = (field: keyof SupplierAdminFormValues) => {
    const state = getFieldState(field);
    return state.isTouched ? !state.invalid : undefined;
  };

  return (
    <>
      {serverError && (
        <FormError message={serverError} onClose={onCloseError ?? (() => {})} />
      )}

      <form
        id="supplier-admin-form"
        className="mt-6 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Название поставщика
          </label>
          <Input
            icon={Truck}
            type="text"
            placeholder="ООО Ромашка"
            {...register('title')}
            valid={getValid('title')}
          />
          <FieldError message={errors.title?.message} />
        </div>
      </form>
    </>
  );
};

export default SupplierAdminForm;

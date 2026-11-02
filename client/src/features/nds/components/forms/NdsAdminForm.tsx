import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Percent, ReceiptText } from 'lucide-react';
import Input from '@/components/ui/inputs/Input';
import FieldError from '@/features/auth/components/FieldError';
import FormError from '@/features/auth/components/FormError';
import { useNotificationStore } from '@/stores/notification/notification.store';
import { useModalStore } from '@/stores/modal/modal.store';
import { useNdsRate } from '../../hooks/use-nds-rate';
import { useUpdateNdsRate } from '../../hooks/use-update-nds-rate';
import { useCreateNdsRate } from '../../hooks/use-create-nds-rate';
import {
  ndsAdminSchema,
  type NdsAdminFormInput,
  type NdsAdminFormValues,
} from '../../schemas/nds-admin.schema';

interface INdsAdminFormProps {
  ndsId?: number;
  serverError?: string;
  onCloseError?: () => void;
}

const NdsAdminForm = ({
  ndsId,
  serverError,
  onCloseError,
}: INdsAdminFormProps) => {
  const { data: ndsRate } = useNdsRate(ndsId);
  const { mutate: updateNds } = useUpdateNdsRate(ndsId ?? -1);
  const { mutate: createNds } = useCreateNdsRate();
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
  } = useForm<NdsAdminFormInput, unknown, NdsAdminFormValues>({
    resolver: zodResolver(ndsAdminSchema),
    defaultValues: {
      titleRate: '',
      rate: '',
    },
  });

  useEffect(() => {
    reset({
      titleRate: ndsRate?.titleRate ?? '',
      rate: ndsRate?.rate ? `${ndsRate?.rate}` : '',
    });
  }, [ndsRate, reset]);

  const onSubmit = (data: NdsAdminFormValues) => {
    if (ndsId) {
      updateNds(data, {
        onSuccess: (data) => {
          addNotification({
            type: 'success',
            title: 'Обновление ставки НДС',
            description: `Ставка НДС #${data.id} успешно обновлен`,
            duration: 3000,
          });
          closeModal();
          reset({
            titleRate: '',
            rate: '',
          });
        },
        onError: () => {
          addNotification({
            type: 'error',
            title: 'Ошибка обновления ставки НДС',
            description: 'Не удалось обновить ставку НДС',
            duration: 3000,
          });
        },
      });
    } else {
      createNds(data, {
        onSuccess: (data) => {
          addNotification({
            type: 'success',
            title: 'Добавление ставки НДС',
            description: `ставка НДС #${data.id} успешно добавлен`,
            duration: 3000,
          });
          closeModal();
          reset({
            titleRate: '',
            rate: '',
          });
        },
        onError: () => {
          addNotification({
            type: 'error',
            title: 'Ошибка добавления ставки НДС',
            description: 'Не удалось добавить ставка НДС',
            duration: 3000,
          });
        },
      });
    }
  };

  const getValid = (field: keyof NdsAdminFormValues) => {
    const state = getFieldState(field);
    return state.isTouched ? !state.invalid : undefined;
  };

  return (
    <>
      {serverError && (
        <FormError message={serverError} onClose={onCloseError ?? (() => {})} />
      )}

      <form
        id="nds-admin-form"
        className="mt-6 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Название ставки НДС
          </label>
          <Input
            icon={ReceiptText}
            type="text"
            placeholder="НДС 15 %"
            {...register('titleRate')}
            valid={getValid('titleRate')}
          />
          <FieldError message={errors.titleRate?.message} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Значение ставки НДС
          </label>
          <Input
            icon={Percent}
            type="number"
            min={0}
            max={100}
            placeholder="15"
            {...register('rate')}
            valid={getValid('rate')}
          />
          <FieldError message={errors.rate?.message} />
        </div>
      </form>
    </>
  );
};

export default NdsAdminForm;

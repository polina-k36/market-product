import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ruler, Text } from 'lucide-react';
import Input from '@/components/ui/inputs/Input';
import FieldError from '@/features/auth/components/FieldError';
import FormError from '@/features/auth/components/FormError';
import { useNotificationStore } from '@/stores/notification/notification.store';
import { useModalStore } from '@/stores/modal/modal.store';
import { useUnit } from '../../hooks/use-unit';
import { useUpdateUnit } from '../../hooks/use-update-unit';
import { useCreateUnit } from '../../hooks/use-create-unit';
import {
  unitAdminSchema,
  type UnitAdminFormValues,
} from '../../schemas/unit-admin.schema';

interface IUnitAdminFormProps {
  unitId?: number;
  serverError?: string;
  onCloseError?: () => void;
}

const UnitAdminForm = ({
  unitId,
  serverError,
  onCloseError,
}: IUnitAdminFormProps) => {
  const { data: unit } = useUnit(unitId);
  const { mutate: updateUnit } = useUpdateUnit(unitId ?? -1);
  const { mutate: createUnit } = useCreateUnit();
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
  } = useForm<UnitAdminFormValues>({
    resolver: zodResolver(unitAdminSchema),
    defaultValues: {
      shortTitle: '',
      fullTitle: '',
    },
  });

  useEffect(() => {
    reset({
      shortTitle: unit?.shortTitle ?? '',
      fullTitle: unit?.fullTitle ?? '',
    });
  }, [unit, reset]);

  const onSubmit = (data: UnitAdminFormValues) => {
    if (unitId) {
      updateUnit(data, {
        onSuccess: (data) => {
          addNotification({
            type: 'success',
            title: 'Обновление единицы измерения',
            description: `Единица измерения #${data.id} успешно обновлена`,
            duration: 3000,
          });
          closeModal();
          reset({
            shortTitle: '',
            fullTitle: '',
          });
        },
        onError: () => {
          addNotification({
            type: 'error',
            title: 'Ошибка обновления единицы измерения',
            description: 'Не удалось обновить единицу измерения',
            duration: 3000,
          });
        },
      });
    } else {
      createUnit(data, {
        onSuccess: (data) => {
          addNotification({
            type: 'success',
            title: 'Добавление единицы измерения',
            description: `Единица измерения #${data.id} успешно добавлена`,
            duration: 3000,
          });
          closeModal();
          reset({
            shortTitle: '',
            fullTitle: '',
          });
        },
        onError: () => {
          addNotification({
            type: 'error',
            title: 'Ошибка добавления единицы измерения',
            description: 'Не удалось добавить единицу измерения',
            duration: 3000,
          });
        },
      });
    }
  };

  const getValid = (field: keyof UnitAdminFormValues) => {
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
            Название единицы измерения
          </label>
          <Input
            icon={Ruler}
            type="text"
            placeholder="килограмм"
            {...register('fullTitle')}
            valid={getValid('fullTitle')}
          />
          <FieldError message={errors.fullTitle?.message} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Сокращенное название единицы
          </label>
          <Input
            icon={Text}
            type="text"
            placeholder="кг"
            {...register('shortTitle')}
            valid={getValid('shortTitle')}
          />
          <FieldError message={errors.shortTitle?.message} />
        </div>
      </form>
    </>
  );
};

export default UnitAdminForm;

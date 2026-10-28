import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, MapPin, Phone, House } from 'lucide-react';
import Input from '@/components/ui/inputs/Input';
import FieldError from '@/features/auth/components/FieldError';
import FormError from '@/features/auth/components/FormError';
import MaskedInput from '@/components/ui/inputs/MaskedInput';
import {
  shopAdminSchema,
  type ShopAdminFormValues,
} from '../../schemas/shop-admin.schema';
import { useNotificationStore } from '@/stores/notification/notification.store';
import { useModalStore } from '@/stores/modal/modal.store';
import { useShop } from '../../hooks/use-shop';
import { useUpdateShop } from '../../hooks/use-update-shop';
import { useCreateShop } from '../../hooks/use-create-shop';

interface IShopAdminFormProps {
  shopId?: number;
  serverError?: string;
  onCloseError?: () => void;
}

const ShopAdminForm = ({
  shopId,
  serverError,
  onCloseError,
}: IShopAdminFormProps) => {
  const { data: shop } = useShop(shopId);
  const { mutate: updateShop } = useUpdateShop(shopId ?? -1);
  const { mutate: createShop } = useCreateShop();
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );
  const closeModal = useModalStore((state) => state.closeModal);

  const {
    register,
    handleSubmit,
    getFieldState,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ShopAdminFormValues>({
    resolver: zodResolver(shopAdminSchema),
    defaultValues: {
      city: '',
      street: '',
      house: '',
      phone: '',
    },
  });

  useEffect(() => {
    reset({
      city: shop?.city ?? '',
      street: shop?.street ?? '',
      house: shop?.house ?? '',
      phone: shop?.phone ?? '',
    });
  }, [shop, reset]);

  const onSubmit = (data: ShopAdminFormValues) => {
    if (shopId) {
      updateShop(data, {
        onSuccess: (data) => {
          addNotification({
            type: 'success',
            title: 'Обновление магазина',
            description: `Магазин #${data.id} успешно обновлён`,
            duration: 3000,
          });
          closeModal();

          reset({
            city: '',
            street: '',
            house: '',
            phone: '',
          });
        },
        onError: () => {
          addNotification({
            type: 'error',
            title: 'Ошибка обновления магазина',
            description: 'Магазин не удалось обновить',
            duration: 3000,
          });
        },
      });
    } else {
      createShop(data, {
        onSuccess: (data) => {
          addNotification({
            type: 'success',
            title: 'Добавление магазина',
            description: `Магазин #${data.id} успешно добавлен`,
            duration: 3000,
          });
          closeModal();

          reset({
            city: '',
            street: '',
            house: '',
            phone: '',
          });
        },
        onError: () => {
          addNotification({
            type: 'error',
            title: 'Ошибка добавления магазина',
            description: 'Магазин не удалось добавить',
            duration: 3000,
          });
        },
      });
    }
  };

  const getValid = (field: keyof ShopAdminFormValues) => {
    const state = getFieldState(field);
    return state.isTouched ? !state.invalid : undefined;
  };

  return (
    <>
      {serverError && (
        <FormError message={serverError} onClose={onCloseError ?? (() => {})} />
      )}

      <form
        id="shop-admin-form"
        className="mt-6 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Город
          </label>
          <Input
            icon={Building2}
            type="text"
            placeholder="Москва"
            {...register('city')}
            valid={getValid('city')}
          />
          <FieldError message={errors.city?.message} />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Улица
          </label>
          <Input
            icon={MapPin}
            type="text"
            placeholder="ул. Ленина"
            {...register('street')}
            valid={getValid('street')}
          />
          <FieldError message={errors.street?.message} />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Номер дома
          </label>
          <Input
            icon={House}
            type="text"
            placeholder="15А"
            {...register('house')}
            valid={getValid('house')}
          />
          <FieldError message={errors.house?.message} />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Телефон магазина
          </label>
          <MaskedInput
            icon={Phone}
            mask="+{7} (000) 000-00-00"
            placeholder="+7 (999) 123-45-67"
            value={watch('phone')}
            onAccept={(value) =>
              setValue('phone', value, { shouldValidate: true })
            }
            valid={getValid('phone')}
          />
          <FieldError message={errors.phone?.message} />
        </div>
      </form>
    </>
  );
};

export default ShopAdminForm;

import Input from '@/components/ui/inputs/Input';
import { useAddress } from '@/features/addresses/hooks/use-address';
import { Building2, MapPin, Navigation } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  addressSchema,
  type AddressFormInput,
  type AddressFormValues,
} from '../../schemas/address.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import FieldError from '@/features/auth/components/FieldError';
import { useCreateUpdateAddress } from '@/features/addresses/hooks/use-create-update-address';
import FormError from '@/features/auth/components/FormError';
// import { useUserModalStore } from '../../store/user-modal.store';
import { useQueryClient } from '@tanstack/react-query';
import { PROFILE_QUERY_KEY } from '@/features/auth/hooks/use-user-profile';

interface IAddressFormProps {
  addressId?: number;
}

const AddressForm = ({ addressId }: IAddressFormProps) => {
  const { data: address } = useAddress(addressId);
  const queryClient = useQueryClient();
  const {
    mutate,
    reset: resetMutation,
    isError,
    error,
  } = useCreateUpdateAddress(addressId);
  const {
    register,
    handleSubmit,
    getFieldState,
    reset: resetForm,
    formState: { errors },
  } = useForm<AddressFormInput, unknown, AddressFormValues>({
    resolver: zodResolver(addressSchema),
  });
  // const closeModal = useUserModalStore((state) => state.closeModal);

  useEffect(() => {
    if (addressId === undefined) {
      resetForm({
        city: '',
        street: '',
        house: '',
        apartment: '',
      });

      return;
    }

    if (address) {
      resetForm({
        city: address.city,
        street: address.street,
        house: address.house,
        apartment: address.apartment ?? '',
      });
    }
  }, [addressId, address, resetForm]);

  const onSubmit = (data: AddressFormValues) => {
    mutate(data, {
      onSuccess: () => {
        resetForm({
          city: '',
          street: '',
          house: '',
          apartment: '',
        });
        // TODO: сделать универсальную форму без приввязки к модел
        // closeModal();
        queryClient.refetchQueries({
          queryKey: PROFILE_QUERY_KEY,
        });
      },
    });
  };

  const closeError = () => {
    resetMutation();
  };

  //TODO: добавление комментария к адресу
  return (
    <>
      {isError && <FormError message={error.message} onClose={closeError} />}

      <form
        id="address-form"
        className="mt-6 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Город
          </label>
          <Input
            icon={Navigation}
            type="text"
            placeholder="Москва"
            {...register('city')}
            valid={
              getFieldState('city').isTouched
                ? !getFieldState('city').invalid
                : undefined
            }
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
            placeholder="Улица Ленина"
            {...register('street')}
            valid={
              getFieldState('street').isTouched
                ? !getFieldState('street').invalid
                : undefined
            }
          />
          <FieldError message={errors.street?.message} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-secondary">
              Дом
            </label>
            <Input
              icon={Building2}
              type="text"
              placeholder="24"
              {...register('house')}
              valid={
                getFieldState('house').isTouched
                  ? !getFieldState('house').invalid
                  : undefined
              }
            />
            <FieldError message={errors.house?.message} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-secondary">
              Квартира
            </label>
            <Input
              icon={Building2}
              type="text"
              placeholder="15"
              {...register('apartment')}
              valid={
                getFieldState('apartment').isTouched
                  ? !getFieldState('apartment').invalid
                  : undefined
              }
            />
            <FieldError message={errors.apartment?.message} />
          </div>
        </div>
      </form>
    </>
  );
};

export default AddressForm;

import Input from '@/components/ui/inputs/Input';
import FieldError from '@/features/auth/components/FieldError';
import FormError from '@/features/auth/components/FormError';
import { useUserProfile } from '@/features/auth/hooks/use-user-profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, Mail, Phone, User2 } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import {
  editUserInfoSchema,
  type EditUserInfoFormInput,
  type EditUserInfoFormValues,
} from '../../schemas/edit-user-info.schema';
import { PROFILE_QUERY_KEY } from '@/features/auth/hooks/use-user-profile';
import { useUpdateUserInfo } from '../../hooks/use-update-info';
import MaskedInput from '@/components/ui/inputs/MaskedInput';
import { useModalStore } from '@/stores/modal/modal.store';

const EditUserInfoForm = () => {
  const { data: user } = useUserProfile();
  const queryClient = useQueryClient();

  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate, reset: resetMutation, isError, error } = useUpdateUserInfo();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    control,
    formState: { errors, touchedFields },
  } = useForm<EditUserInfoFormInput, unknown, EditUserInfoFormValues>({
    resolver: zodResolver(editUserInfoSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  useEffect(() => {
    if (!user) return;

    resetForm({
      name: user.name ?? '',
      email: user.email ?? '',
      phone: user.phone ?? '',
    });
  }, [user, resetForm]);

  const onSubmit = (data: EditUserInfoFormValues) => {
    mutate(data, {
      onSuccess: () => {
        resetMutation();
        closeModal();

        queryClient.invalidateQueries({
          queryKey: PROFILE_QUERY_KEY,
        });
      },
    });
  };

  const closeError = () => {
    resetMutation();
  };

  return (
    <>
      {isError && <FormError message={error.message} onClose={closeError} />}

      <form
        id="edit-user-info-form"
        className="space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Имя
          </label>

          <Input
            icon={User2}
            type="text"
            placeholder="Ваше имя"
            {...register('name')}
            valid={touchedFields.name ? !errors.name : undefined}
          />

          <FieldError message={errors.name?.message} />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Email
          </label>

          <Input
            icon={Mail}
            type="email"
            placeholder="example@mail.com"
            {...register('email')}
            valid={touchedFields.email ? !errors.email : undefined}
          />

          <FieldError message={errors.email?.message} />

          {user?.emailVerified && (
            <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-500">
              <CheckCircle className="size-3.5" />
              Почта подтверждена
            </div>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Телефон
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <MaskedInput
                {...field}
                mask="+{7} (000) 000-00-00"
                placeholder="+7 (000) 000-00-00"
                icon={Phone}
                value={field.value}
                onAccept={(value) => field.onChange(value)}
              />
            )}
          />

          <FieldError message={errors.phone?.message} />
        </div>
      </form>
    </>
  );
};

export default EditUserInfoForm;

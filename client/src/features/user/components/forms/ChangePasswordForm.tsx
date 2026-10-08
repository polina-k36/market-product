import Input from '@/components/ui/inputs/Input';
import ButtonIcon from '@/components/ui/buttons/ButtonIcon';
import FieldError from '@/features/auth/components/FieldError';
import FormError from '@/features/auth/components/FormError';
import { useUserModalStore } from '@/features/user/store/user-modal.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed, Lock } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from '../../schemas/change-password.schema';
import { useChangePassword } from '../../hooks/use-change-password';

const ChangePasswordForm = () => {
  const closeModal = useUserModalStore((state) => state.closeModal);

  const [currentPasswordOpen, setCurrentPasswordOpen] = useState(false);
  const [newPasswordOpen, setNewPasswordOpen] = useState(false);
  const [confirmPasswordOpen, setConfirmPasswordOpen] = useState(false);

  const { mutate, reset: resetMutation, isError, error } = useChangePassword();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    getFieldState,
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ChangePasswordFormValues) => {
    mutate(data, {
      onSuccess: () => {
        resetForm();
        closeModal();
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
        id="change-password-form"
        className="mt-6 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Текущий пароль
          </label>

          <Input
            icon={Lock}
            type={currentPasswordOpen ? 'text' : 'password'}
            placeholder="Введите текущий пароль"
            {...register('currentPassword')}
            valid={
              getFieldState('currentPassword').isTouched
                ? !getFieldState('currentPassword').invalid
                : undefined
            }
          >
            <ButtonIcon
              variant="transparent"
              type="button"
              aria-label={
                currentPasswordOpen ? 'Скрыть пароль' : 'Показать пароль'
              }
              className="absolute right-0"
              onClick={() => setCurrentPasswordOpen((state) => !state)}
            >
              {currentPasswordOpen ? (
                <EyeClosed className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </ButtonIcon>
          </Input>

          {getFieldState('currentPassword').invalid && (
            <FieldError
              message={getFieldState('currentPassword').error?.message}
            />
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Новый пароль
          </label>

          <Input
            icon={Lock}
            type={newPasswordOpen ? 'text' : 'password'}
            placeholder="Введите новый пароль"
            {...register('newPassword')}
            valid={
              getFieldState('newPassword').isTouched
                ? !getFieldState('newPassword').invalid
                : undefined
            }
          >
            <ButtonIcon
              variant="transparent"
              type="button"
              aria-label={newPasswordOpen ? 'Скрыть пароль' : 'Показать пароль'}
              className="absolute right-0"
              onClick={() => setNewPasswordOpen((state) => !state)}
            >
              {newPasswordOpen ? (
                <EyeClosed className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </ButtonIcon>
          </Input>

          {getFieldState('newPassword').invalid && (
            <FieldError message={getFieldState('newPassword').error?.message} />
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Подтвердите новый пароль
          </label>

          <Input
            icon={Lock}
            type={confirmPasswordOpen ? 'text' : 'password'}
            placeholder="Повторите новый пароль"
            {...register('confirmPassword')}
            valid={
              getFieldState('confirmPassword').isTouched
                ? !getFieldState('confirmPassword').invalid
                : undefined
            }
          >
            <ButtonIcon
              variant="transparent"
              type="button"
              aria-label={
                confirmPasswordOpen ? 'Скрыть пароль' : 'Показать пароль'
              }
              className="absolute right-0"
              onClick={() => setConfirmPasswordOpen((state) => !state)}
            >
              {confirmPasswordOpen ? (
                <EyeClosed className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </ButtonIcon>
          </Input>

          {getFieldState('confirmPassword').invalid && (
            <FieldError
              message={getFieldState('confirmPassword').error?.message}
            />
          )}
        </div>
      </form>
    </>
  );
};

export default ChangePasswordForm;

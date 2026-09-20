import Button from '@/components/ui/buttons/Button';
import ButtonIcon from '@/components/ui/buttons/ButtonIcon';
import Input from '@/components/ui/inputs/Input';
import { ChevronRight, Eye, EyeClosed, Lock, Mail, User2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  registerSchema,
  type RegisterFormValues,
} from '../schemas/register.schema';
import FieldError from './FieldError';
import { useRegister } from '../hooks/use-register';
import { useAuthStore } from '@/stores/auth/auth.store';
import { useNavigate } from 'react-router';
import FormError from './FormError';

const RegisterForm = () => {
  const [passOpen, setPassOpen] = useState(false);
  const navigate = useNavigate();
  const { setAccessToken, setUser, setAuthStatus } = useAuthStore();
  const {
    register,
    getFieldState,
    reset: resetForm,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });
  const { mutate, reset: resetMutation, isError, error } = useRegister();

  const onSubmit = (data: RegisterFormValues) => {
    mutate(data, {
      onSuccess: (data) => {
        setAccessToken(data.accessToken);
        setUser(data.user);
        setAuthStatus('authenticated');
        resetForm();
        navigate('/');
      },
    });
  };

  const closeError = () => {
    resetMutation();
  };

  return (
    <>
      {isError && <FormError message={error.message} onClose={closeError} />}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          icon={User2}
          type="text"
          placeholder="Имя и фамилия"
          {...register('name')}
          valid={
            getFieldState('name').isTouched
              ? !getFieldState('name').invalid
              : undefined
          }
        />
        <FieldError message={errors.name?.message} />
        <Input
          icon={Mail}
          type="text"
          placeholder="Email или телефон"
          {...register('login')}
          valid={
            getFieldState('login').isTouched
              ? !getFieldState('login').invalid
              : undefined
          }
        />
        <FieldError message={errors.login?.message} />
        <Input
          icon={Lock}
          type={passOpen ? 'text' : 'password'}
          placeholder="Пароль"
          {...register('password')}
          valid={
            getFieldState('password').isTouched
              ? !getFieldState('password').invalid
              : undefined
          }
        >
          <ButtonIcon
            type="button"
            variant="transparent"
            className="absolute right-0"
            onClick={() => setPassOpen((state) => !state)}
          >
            {passOpen ? (
              <EyeClosed className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </ButtonIcon>
        </Input>
        <FieldError message={errors.password?.message} />
        <Input
          icon={Lock}
          type={passOpen ? 'text' : 'password'}
          placeholder="Подтвердите пароль"
          {...register('confirmPassword')}
          valid={
            getFieldState('confirmPassword').isTouched
              ? !getFieldState('confirmPassword').invalid
              : undefined
          }
        />
        <FieldError message={errors.confirmPassword?.message} />

        <Button variant="primary" className="group" type="submit">
          Создать аккаунт
          <ChevronRight className="size-5 -translate-x-2 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;

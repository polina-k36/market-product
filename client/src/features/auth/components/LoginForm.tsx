import Button from '@/components/ui/buttons/Button';
import ButtonIcon from '@/components/ui/buttons/ButtonIcon';
import Input from '@/components/ui/inputs/Input';
import { ChevronRight, Eye, EyeClosed, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginFormValues } from '../schemas/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import FieldError from './FieldError';
import { useLogin } from '../hooks/use-login';
import { useAuthStore } from '@/stores/auth/auth.store';
import { useNavigate } from 'react-router';
import FormError from './FormError';

const LoginForm = () => {
  const [passOpen, setPassOpen] = useState(false);
  const {
    register,
    handleSubmit,
    getFieldState,
    reset: resetForm,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, reset: resetMutation, isError, error } = useLogin();
  const { setAccessToken, setUser, setAuthStatus } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormValues) => {
    mutate(data, {
      onSuccess: (data) => {
        setAccessToken(data.accessToken);
        setAuthStatus('authenticated');
        setUser(data.user);
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
            variant="transparent"
            type="button"
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
        <div className="flex justify-end">
          <button
            type="button"
            className="cursor-pointer text-sm font-medium text-primary transition-colors duration-200 hover:text-primary-hover"
          >
            Забыли пароль?
          </button>
        </div>
        <Button variant="primary" className="group" type="submit">
          Войти
          <ChevronRight className="size-5 -translate-x-2 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Button>
      </form>
    </>
  );
};

export default LoginForm;

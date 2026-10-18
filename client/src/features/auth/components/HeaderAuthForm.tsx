import { env } from '@/config/env';
import { useEffect, useRef } from 'react';
import { useGoogleLogin } from '../hooks/use-google-login';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/stores/auth/auth.store';
import FormError from './FormError';

interface IHeaderAuthFormProps {
  title: string;
  subtitle: string;
}

const HeaderAuthForm = ({ title, subtitle }: IHeaderAuthFormProps) => {
  const initializedRef = useRef(false);
  const { mutate, reset: resetMutation, isError, error } = useGoogleLogin();
  const { setAccessToken, setUser, setAuthStatus } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!initializedRef.current) {
      google.accounts.id.initialize({
        client_id: env.googleClientId,
        callback: (response) => {
          mutate(response.credential, {
            onSuccess: (data) => {
              setAccessToken(data.accessToken);
              setUser(data.user);
              setAuthStatus('authenticated');
              navigate('/');
            },
          });
        },
      });
      initializedRef.current = true;
    }

    const button = document.getElementById('google-btn');

    if (button) {
      button.replaceChildren();

      google.accounts.id.renderButton(button, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
      });
    }
  }, []);

  const closeError = () => {
    resetMutation();
  };
  return (
    <div className="mt-4 flex flex-col items-center sm:items-start">
      <h1 className="text-2xl font-semibold text-text-primary">{title}</h1>

      <p className="mt-1 text-base text-text-secondary">{subtitle}</p>
      {isError && <FormError message={error.message} onClose={closeError} />}
      <div id="google-btn" className="mt-7 w-full"></div>
      <div className="mt-5 mb-5 flex w-full items-center gap-3">
        <div className="h-px w-full flex-1 bg-border" />
        <span className="text-sm text-text-secondary">или</span>
        <div className="h-px w-full flex-1 bg-border" />
      </div>
    </div>
  );
};

export default HeaderAuthForm;

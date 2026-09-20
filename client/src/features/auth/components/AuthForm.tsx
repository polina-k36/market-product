import { useState } from 'react';
import LoginForm from './LoginForm';
import HeaderAuthForm from './HeaderAuthForm';
import NavButton from '@/components/ui/buttons/NavButton';
import { useNavigate } from 'react-router';
import FullLogo from '@/components/ui/logo/FullLogo';
import AuthTabPanel from './AuthTabPanel';
import RegisterForm from './RegisterForm';

const AuthForm = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const headerTitle =
    mode === 'login' ? 'Добро пожаловать!' : 'Создать аккаунт';
  const headerSubtitle =
    mode === 'login'
      ? 'Войдите, чтобы продолжить'
      : 'Заполните данные для регистрации';
  const form = mode === 'login' ? <LoginForm /> : <RegisterForm />;
  return (
    <div className="flex-1 p-10">
      <NavButton onNavigate={() => navigate('/')}>К магазину</NavButton>
      <FullLogo variant="primary" />
      <AuthTabPanel mode={mode} onChangeMode={setMode} />
      <HeaderAuthForm title={headerTitle} subtitle={headerSubtitle} />
      {form}
    </div>
  );
};

export default AuthForm;

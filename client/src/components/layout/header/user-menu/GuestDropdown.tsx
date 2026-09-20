import Button from '@/components/ui/buttons/Button';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { LogIn, User2 } from 'lucide-react';
import { useNavigate } from 'react-router';

const GuestDropdown = () => {
  const navigate = useNavigate();
  return (
    <Dropdown side="right">
      <div className="g-4 mb-4 flex flex-col items-center text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-surface-muted">
          <User2 className="size-8 text-text-primary" />
        </div>
        <h3 className="text-base font-semibold text-text-primary">
          Войдите в аккаунт
        </h3>
        <p className="text-[0.875rem] text-text-secondary">
          Получите доступ к истории заказов и настройкам
        </p>
      </div>
      <Button
        variant="primary"
        className="w-full"
        onClick={() => navigate('/auth')}
      >
        <LogIn />
        Вход/Регистрация
      </Button>
    </Dropdown>
  );
};

export default GuestDropdown;

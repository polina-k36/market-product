import Button from '@/components/ui/buttons/Button';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { LogIn, User2 } from 'lucide-react';

const GuestDropdown = () => {
  return (
    <Dropdown>
      <div className="flex flex-col items-center g-4 text-center mb-4">
        <div className="flex items-center justify-center size-16 bg-surface-muted rounded-full mb-4">
          <User2 className="size-8 text-text-primary" />
        </div>
        <h3 className="text-text-primary font-semibold text-base">
          Войдите в аккаунт
        </h3>
        <p className="text-text-secondary text-[0.875rem]">
          Получите доступ к истории заказов и настройкам
        </p>
      </div>
      <Button variant="primary" className="w-full">
        <LogIn />
        Вход/Регистрация
      </Button>
    </Dropdown>
  );
};

export default GuestDropdown;

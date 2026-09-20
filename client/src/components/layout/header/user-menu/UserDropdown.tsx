import Button from '@/components/ui/buttons/Button';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { LogOut, Package, Settings, User2 } from 'lucide-react';

interface IUserDropdownProps {
  user: {
    name: string;
    email?: string | null;
  };
}

const UserDropdown = ({ user }: IUserDropdownProps) => {
  return (
    <Dropdown side="right">
      <div className="mb-4 flex items-center justify-start gap-4 text-center">
        <div className="flex size-13 items-center justify-center rounded-full bg-primary-soft">
          <User2 className="size-7 text-primary" />
        </div>
        <div className="text-left">
          <div className="m-0 max-w-40 min-w-0 font-semibold text-text-primary">
            {user.name}
          </div>
          {user.email && (
            <div className="max-w-40 min-w-0 truncate text-text-secondary">
              {user.email.split('@')[0]}
            </div>
          )}
        </div>
      </div>

      <div className="menu-items">
        <Button variant="transparent" className="w-full justify-start">
          <Settings className="size-5" />
          <a href="" className="display-block text-left">
            <p className="font-semibold text-text-primary">Мой аккаунт</p>
            <p className="text-[0.875rem] text-text-muted">
              Настройки и профиль
            </p>
          </a>
        </Button>
        <Button variant="transparent" className="w-full justify-start">
          <Package className="size-5" />
          <a href="" className="display-block text-left">
            <p className="font-semibold text-text-primary">Мои заказы</p>
            <p className="text-[0.875rem] text-text-muted">История покупок</p>
          </a>
        </Button>
        <hr className="mt-2 mb-2 border-0 border-t border-border-strong" />
        <Button variant="danger" className="w-full justify-start">
          <LogOut className="size-5" />
          <a href="" className="display-block text-left">
            Выйти
          </a>
        </Button>
      </div>
    </Dropdown>
  );
};

export default UserDropdown;

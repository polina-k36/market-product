import Button from '@/components/ui/buttons/Button';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { LogOut, Settings, User2 } from 'lucide-react';

const UserDropdown = () => {
  return (
    <Dropdown>
      <div className="mb-4 flex items-center justify-start gap-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-surface-muted">
          <User2 className="size-8 text-text-primary" />
        </div>
        <div className="text-left">
          <div className="m-0 font-semibold text-text-primary">
            Иванов Сергей
          </div>
          <div className="m-0 text-text-secondary">asjdaksda@jksd.ds</div>
        </div>
      </div>

      <div className="menu-items">
        <Button variant="transparent" className="w-full justify-start">
          <Settings />
          <a href="" className="display-block text-left">
            <p className="font-semibold text-text-primary">Мой аккаунт</p>
            <p className="text-[0.875rem] text-text-muted">
              Настройки и профиль
            </p>
          </a>
        </Button>
        <Button variant="transparent" className="w-full justify-start">
          <Settings />
          <a href="" className="display-block text-left">
            <p className="font-semibold text-text-primary">Мой аккаунт</p>
            <p className="text-[0.875rem] text-text-muted">
              Настройки и профиль
            </p>
          </a>
        </Button>
        <hr className="mt-2 mb-2 border-0 border-t border-border-strong" />
        <Button variant="danger" className="w-full justify-start">
          <LogOut />
          <a href="" className="display-block text-left">
            Выйти
          </a>
        </Button>
      </div>
    </Dropdown>
  );
};

export default UserDropdown;

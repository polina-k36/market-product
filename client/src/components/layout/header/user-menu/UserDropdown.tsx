import Button from '@/components/ui/buttons/Button';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { LogOut, Settings, User2 } from 'lucide-react';

const UserDropdown = () => {
  return (
    <Dropdown>
      <div className="flex items-center justify-start gap-4 text-center mb-4">
        <div className="flex items-center justify-center size-16 bg-surface-muted rounded-full">
          <User2 className="size-8 text-text-primary" />
        </div>
        <div className="text-left">
          <div className="text-text-primary font-semibold m-0">
            Иванов Сергей
          </div>
          <div className="text-text-secondary m-0">asjdaksda@jksd.ds</div>
        </div>
      </div>

      <div className="menu-items">
        <Button variant="transparent" className="justify-start w-full">
          <Settings />
          <a href="" className="display-block text-left">
            <p className="font-semibold text-text-primary">Мой аккаунт</p>
            <p className="text-[0.875rem] text-text-muted">
              Настройки и профиль
            </p>
          </a>
        </Button>
        <Button variant="transparent" className="justify-start w-full">
          <Settings />
          <a href="" className="display-block text-left">
            <p className="font-semibold text-text-primary">Мой аккаунт</p>
            <p className="text-[0.875rem] text-text-muted">
              Настройки и профиль
            </p>
          </a>
        </Button>
        <hr className="border-0 border-t mb-2 mt-2 border-border-strong" />
        <Button variant="danger" className="justify-start w-full">
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

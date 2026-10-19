import Button from '@/components/ui/buttons/Button';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { useLogout } from '@/features/auth/hooks/use-logout';
import { useAuthStore } from '@/stores/auth/auth.store';
import { LogOut, Package, Settings, User2 } from 'lucide-react';
import { useNavigate } from 'react-router';

interface IUserDropdownProps {
  user: {
    name: string;
    email?: string | null;
  };
  onClose: () => void;
}

const UserDropdown = ({ user, onClose }: IUserDropdownProps) => {
  const navigate = useNavigate();
  const { mutate } = useLogout();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const logout = () => {
    mutate(undefined, {
      onSuccess: () => {
        onClose();
        clearAuth();
        location.reload();
      },
    });
  };
  return (
    <Dropdown
      side="right"
      role="dialog"
      topHeight="sm"
      ariaLabel="Меню зарегистрированного пользователя"
      onClose={onClose}
    >
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
        <Button
          variant="transparent"
          className="w-full justify-start"
          onClick={() => {
            onClose();
            navigate('/profile?mode=settings');
          }}
        >
          <Settings className="size-5" />
          <div className="text-left">
            <p className="font-semibold text-text-primary">Мой аккаунт</p>
            <p className="text-[0.875rem] text-text-muted">
              Настройки и профиль
            </p>
          </div>
        </Button>
        <Button
          variant="transparent"
          className="w-full justify-start"
          onClick={() => {
            onClose();
            navigate('/profile?mode=orders');
          }}
        >
          <Package className="size-5" />
          <div className="text-left">
            <p className="font-semibold text-text-primary">Мои заказы</p>
            <p className="text-[0.875rem] text-text-muted">История покупок</p>
          </div>
        </Button>
        <hr className="mt-2 mb-2 border-0 border-t border-border-strong" />
        <Button
          variant="danger"
          className="w-full justify-start"
          onClick={logout}
        >
          <LogOut className="size-5" />
          Выйти
        </Button>
      </div>
    </Dropdown>
  );
};

export default UserDropdown;

import { User2 } from 'lucide-react';
import { useState } from 'react';

import GuestDropdown from './GuestDropdown';
import UserDropdown from './UserDropdown';
import ButtonIcon from '@/components/ui/buttons/ButtonIcon';
import { useAuthStore } from '@/stores/auth/auth.store';
import { useUserProfile } from '@/features/auth/hooks/use-user-profile';

const UserMenu = () => {
  const [activeDropdown, setActiveDropdown] = useState(false);

  const { status } = useAuthStore();
  const { data } = useUserProfile();

  const handleClose = () => {
    setActiveDropdown(false);
  };

  const dropdown =
    status === 'authenticated' ? (
      <UserDropdown
        user={{
          name: data?.name || '',
          email: data?.email,
        }}
        onClose={handleClose}
      />
    ) : status === 'unauthenticated' ? (
      <GuestDropdown onClose={handleClose} />
    ) : (
      <div className="p-3 text-sm text-text-secondary">
        Загрузка информации о входе...
      </div>
    );

  return (
    <div className="relative inline-block">
      <ButtonIcon
        variant="transparent"
        isActive={activeDropdown}
        onClick={() => setActiveDropdown((state) => !state)}
      >
        <User2 className="size-6 text-text-primary" />
      </ButtonIcon>

      {activeDropdown && (
        <>
          <button
            type="button"
            aria-label="Закрыть меню пользователя"
            onClick={handleClose}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="relative z-50">{dropdown}</div>
        </>
      )}
    </div>
  );
};

export default UserMenu;

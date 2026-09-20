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
  const dropdown =
    status === 'authenticated' ? (
      <UserDropdown
        user={{
          name: data?.name || '',
          email: data?.email,
        }}
      />
    ) : status === 'unauthenticated' ? (
      <GuestDropdown />
    ) : (
      'загрузка информации о входе.'
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
      {activeDropdown ? dropdown : undefined}
    </div>
  );
};

export default UserMenu;

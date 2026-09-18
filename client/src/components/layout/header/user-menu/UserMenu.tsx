import { User2 } from 'lucide-react';
import { useState } from 'react';
import GuestDropdown from './GuestDropdown';
import UserDropdown from './UserDropdown';
import ButtonIcon from '@/components/ui/buttons/ButtonIcon';

const UserMenu = () => {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const isAuthenticated = true;
  const dropdown = isAuthenticated ? <UserDropdown /> : <GuestDropdown />;
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

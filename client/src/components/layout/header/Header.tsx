import FullLogo from '@/components/ui/logo/FullLogo';
import SearchInput from '@/components/ui/search/SearchInput';
import UserMenu from './user-menu/UserMenu';
import { Search, ShoppingBasket, X } from 'lucide-react';
import ButtonIcon from '@/components/ui/buttons/ButtonIcon';
import { useState } from 'react';

const Header = () => {
  const [activeSearch, setActiveSearch] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-surface p-2 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center justify-start gap-4">
          <FullLogo />
          <SearchInput className="hidden md:block" />
        </div>
        <div className="flex items-center justify-between gap-1">
          <ButtonIcon
            isActive={activeSearch}
            onClick={() => {
              setActiveSearch((state) => !state);
            }}
            className={`transition-transform duration-300 ease-in-out md:hidden ${
              activeSearch ? 'rotate-180' : 'rotate-0'
            }`}
          >
            {activeSearch ? (
              <X className="size-6 text-text-primary" />
            ) : (
              <Search className="size-6 text-text-primary" />
            )}
          </ButtonIcon>
          <UserMenu />
          <ButtonIcon isActive={false}>
            <ShoppingBasket className="size-6 text-text-primary" />
          </ButtonIcon>
        </div>
      </div>
      <SearchInput
        className={`${activeSearch ? '' : 'hidden'} mt-4 md:hidden`}
      />
    </header>
  );
};

export default Header;

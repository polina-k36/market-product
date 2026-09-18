import FullLogo from '@/components/ui/logo/FullLogo';
import UserMenu from './user-menu/UserMenu';
import { Search, ShoppingBasket, X } from 'lucide-react';
import ButtonIcon from '@/components/ui/buttons/ButtonIcon';
import { useState } from 'react';
import Input from '@/components/ui/inputs/Input';
import { useProductFilters } from '@/features/products/hooks/use-product-filters';
import Button from '@/components/ui/buttons/Button';

const Header = () => {
  const [activeSearch, setActiveSearch] = useState(false);

  const { filters, actions } = useProductFilters();

  const [inputSearch, setInputSearch] = useState(filters.search ?? '');

  const changeFilterSearch = () => {
    actions.setSearch(inputSearch.trim() || undefined);
  };

  const toggleSearch = () => {
    if (activeSearch) {
      setInputSearch('');
      changeFilterSearch();
    }
    setActiveSearch((state) => !state);
  };

  const clearSearch = () => {
    setInputSearch('');
    actions.setSearch();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-surface p-2 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center justify-start gap-4">
          <FullLogo />

          <div className="hidden flex-1 items-center gap-2 md:flex">
            <Input
              value={inputSearch}
              onInput={(e) => setInputSearch(e.currentTarget.value)}
              type="text"
              placeholder="Поиск продуктов..."
              icon={Search}
              className="flex-1"
            >
              {inputSearch && (
                <ButtonIcon
                  variant="transparent"
                  className="absolute right-0"
                  onClick={clearSearch}
                >
                  <X className="size-5 text-text-muted" />
                </ButtonIcon>
              )}
            </Input>

            <Button variant="primary" onClick={changeFilterSearch}>
              <Search className="size-4" />
              Найти
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-1">
          <ButtonIcon
            variant="transparent"
            isActive={activeSearch}
            onClick={toggleSearch}
            className={`transition-transform duration-300 ease-in-out md:hidden ${activeSearch ? 'rotate-180' : 'rotate-0'} `}
          >
            {activeSearch ? (
              <X className="size-6 text-text-primary" />
            ) : (
              <Search className="size-6 text-text-primary" />
            )}
          </ButtonIcon>

          <UserMenu />

          <ButtonIcon isActive={false} variant="transparent">
            <ShoppingBasket className="size-6 text-text-primary" />
          </ButtonIcon>
        </div>
      </div>

      <div
        className={` ${activeSearch ? 'flex' : 'hidden'} mt-4 items-center gap-2 md:hidden`}
      >
        <Input
          value={inputSearch}
          onInput={(e) => setInputSearch(e.currentTarget.value)}
          type="text"
          placeholder="Поиск продуктов..."
          icon={Search}
          className="flex-1"
        >
          {inputSearch && (
            <ButtonIcon
              variant="transparent"
              className="absolute right-0"
              onClick={clearSearch}
            >
              <X className="size-5 text-text-muted" />
            </ButtonIcon>
          )}
        </Input>
        <ButtonIcon variant="primary">
          <Search className="size-5" />
        </ButtonIcon>
      </div>
    </header>
  );
};

export default Header;

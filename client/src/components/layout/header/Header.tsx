import FullLogo from '@/components/ui/logo/FullLogo';
import UserMenu from './user-menu/UserMenu';
import { Search, ShoppingBasket, X } from 'lucide-react';
import ButtonIcon from '@/components/ui/buttons/ButtonIcon';
import { useEffect, useState } from 'react';
import Input from '@/components/ui/inputs/Input';
import { useProductFilters } from '@/features/products/hooks/use-product-filters';
import Button from '@/components/ui/buttons/Button';
import { useCartStore } from '@/features/cart/store/cart.store';
import CartPanel from '@/features/cart/components/CartPanel';
import { useCountCartItems } from '@/features/cart/hooks/use-count-cart-items';
import ShopDropdown from './shop-menu/ShopDropdown';

const Header = () => {
  const [activeSearch, setActiveSearch] = useState(false);
  const isCartOpen = useCartStore((state) => state.isOpen); //XXX: подумать над надобностью стора
  const openCart = useCartStore((state) => state.openCart);
  const countItems = useCartStore((state) => state.countItems);

  const { data: count, isSuccess } = useCountCartItems();
  const setCountItems = useCartStore((state) => state.setCountItems);

  useEffect(() => {
    if (isSuccess) {
      setCountItems(count);
    }
  }, [count, isSuccess, setCountItems]);

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

  const onOpenCart = () => {
    openCart();
    document.body.style.overflowY = 'hidden';
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-surface p-2 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center justify-start gap-4">
          <FullLogo variant="primary" />

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

          <ShopDropdown />

          <UserMenu />
          <div className="relative size-fit">
            <ButtonIcon
              isActive={false}
              variant="transparent"
              onClick={onOpenCart}
            >
              <ShoppingBasket className="size-6 text-text-primary" />
            </ButtonIcon>
            {countItems !== 0 && (
              <span className="absolute top-0 right-0 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-text-inverse">
                {countItems}
              </span>
            )}
          </div>
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

      {isCartOpen && <CartPanel />}
    </header>
  );
};

export default Header;

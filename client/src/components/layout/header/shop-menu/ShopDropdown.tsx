import { useMemo, useState } from 'react';
import { ChevronDown, Search, Store, X } from 'lucide-react';

import { useShops } from '@/features/shops/hooks/use-shops';
import { useShopStore } from '@/stores/shop/shop.store';
import ShopAddressCard from '../../../../features/shops/components/ShopAddressCard';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import ShopAddressCardSkeleton from '@/features/shops/components/ShopAddressCardSkeleton';
import ShopAddressListError from '@/features/shops/components/ShopAddressListError';

const ShopDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const {
    data: shops,
    isLoading: isLoadingShops,
    isError: isErrorShops,
    refetch: refetchShops,
  } = useShops();
  const { shopId, setShopId } = useShopStore();

  const filteredShops = useMemo(() => {
    if (!shops) return [];

    const query = search.trim().toLowerCase();

    if (!query) return shops;

    return shops.filter((shop) =>
      `${shop.city} ${shop.street} д. ${shop.house} ${shop.phone.replace(/\D/g, '')}`
        .toLowerCase()
        .includes(query),
    );
  }, [shops, search]);

  const activeShop = useMemo(
    () => shops?.find((shop) => shop.id === shopId),
    [shops, shopId],
  );

  const handleClose = () => {
    setIsOpen(false);
    setSearch('');
  };

  const handleSelect = (id: number) => {
    setShopId(id);
    setSearch('');
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={`flex max-w-56 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-left transition-colors ${
          isOpen
            ? 'border-primary/40 bg-primary/5'
            : 'border-border bg-surface hover:border-primary/40'
        }`}
      >
        <Store className="h-5 w-5 shrink-0 text-primary" />

        <span className="hidden min-w-0 flex-1 md:block">
          <span className="block text-[11px] text-text-secondary">
            Ваш магазин
          </span>

          <span className="block truncate text-sm font-medium text-text-primary">
            {activeShop
              ? `${activeShop.city}, ${activeShop.street} д. ${activeShop.house}`
              : 'Выбрать магазин'}
          </span>
        </span>

        <ChevronDown
          className={`hidden h-4 w-4 shrink-0 text-text-secondary transition-transform md:block ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Закрыть выбор магазина"
            onClick={handleClose}
            className="fixed inset-0 z-40 cursor-default"
          />

          <Dropdown
            side="right-center"
            topHeight="md"
            role="dialog"
            ariaLabel="Выбор магазина"
            onClose={handleClose}
            className="w-[min(92vw,390px)] p-0"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
              <div>
                <h2 className="font-semibold text-text-primary">
                  Выберите магазин
                </h2>
                <p className="mt-0.5 text-xs text-text-secondary">
                  Магазин для вашего заказа
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Закрыть"
                className="cursor-pointer rounded-lg p-2 text-text-secondary transition-colors hover:bg-background hover:text-text-primary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-3">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3">
                <Search className="h-4 w-4 shrink-0 text-text-secondary" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Адрес или телефон"
                  aria-label="Поиск магазина"
                  className="h-10 min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    aria-label="Очистить поиск"
                    className="text-text-secondary hover:text-text-primary"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-[min(55vh,380px)] custom-scrollbar overflow-y-auto px-2 pb-2">
              {isLoadingShops ? (
                <div className="space-y-2">
                  {Array.from({ length: 3 }, (_, index) => (
                    <ShopAddressCardSkeleton key={index} />
                  ))}
                </div>
              ) : isErrorShops ? (
                <ShopAddressListError onRetry={() => refetchShops()} />
              ) : !shops || shops?.length === 0 ? (
                <p className="py-8 text-center text-sm text-text-secondary">
                  Пока нет доступных магазинов
                </p>
              ) : (
                <div className="space-y-2">
                  {filteredShops?.map((shop) => (
                    <ShopAddressCard
                      shop={shop}
                      isSelected={activeShop?.id === shop.id}
                      onSelect={handleSelect}
                    />
                  ))}
                </div>
              )}
            </div>

            {shops && (
              <div className="border-t border-border px-4 py-3">
                <p className="text-xs text-text-secondary">
                  Доступно магазинов: {shops.length}
                </p>
              </div>
            )}
          </Dropdown>
        </>
      )}
    </div>
  );
};

export default ShopDropdown;

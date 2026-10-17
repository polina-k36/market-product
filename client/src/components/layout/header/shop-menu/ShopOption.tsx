import type { IShopData } from '@/features/shops/types/shop.types';
import { Check, MapPin, Phone, Store } from 'lucide-react';

interface StoreOptionProps {
  shop: IShopData;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const ShopOption = ({ shop, isSelected, onSelect }: StoreOptionProps) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(shop.id_shop)}
      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl p-3 text-left transition-colors ${
        isSelected ? 'bg-primary/5' : 'hover:bg-background'
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
          isSelected
            ? 'bg-primary text-white'
            : 'bg-background text-text-secondary'
        }`}
      >
        <Store className="h-5 w-5" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-text-primary">
          {shop.shop_city}
        </span>

        <span className="mt-1 flex items-start gap-1.5 text-xs leading-5 text-text-secondary">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>
            {shop.shop_street} д. {shop.shop_house}
          </span>
        </span>

        <span className="mt-0.5 flex items-center gap-1.5 text-xs text-text-secondary">
          <Phone className="h-3.5 w-3.5 shrink-0" />
          <span>{shop.phone}</span>
        </span>
      </span>

      {isSelected && <Check className="h-5 w-5 shrink-0 text-primary" />}
    </button>
  );
};

export default ShopOption;

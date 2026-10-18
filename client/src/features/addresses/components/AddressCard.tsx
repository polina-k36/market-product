import type { IShopData } from '@/features/shops/types/shop.types';
import { Check, MapPin, Phone, Store } from 'lucide-react';

interface StoreOptionProps {
  shop: IShopData;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const AddressCard = ({ shop, isSelected, onSelect }: StoreOptionProps) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(shop.id_shop)}
      className={`flex w-full cursor-pointer items-start justify-between gap-3 rounded-xl p-3 text-left transition-colors ${
        isSelected ? 'bg-primary/5' : 'hover:bg-background'
      }`}
    >
      <div className="flex items-center justify-start gap-4">
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

          <p
            className={`mt-1 text-xs ${
              new Date().getHours() >= 22 ? 'text-red' : 'text-primary'
            }`}
          >
            {new Date().getHours() >= 22
              ? 'Магазин закрыт. Откроется в 7:00' //TODO: подумать над хранением графика магазинов
              : 'Сегодня до 22:00'}
          </p>
        </span>
      </div>
      {isSelected && (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-white">
          <Check className="h-2.5 w-2.5" />
        </span>
      )}
    </button>
  );
};

export default AddressCard;

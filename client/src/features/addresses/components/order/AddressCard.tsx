import type { IAddress } from '../../types/address.types';
import { Check, MapPin } from 'lucide-react';

interface IAddressCardProps {
  address: IAddress;
  isSelected: boolean;
  handleSelectAddress: (id: number) => void;
}

const AddressCard = ({
  address,
  isSelected,
  handleSelectAddress,
}: IAddressCardProps) => {
  return (
    <button
      key={address.id}
      type="button"
      onClick={() => handleSelectAddress(address.id)}
      className={`flex min-w-45 cursor-pointer items-start gap-3 rounded-lg border px-2.5 py-2 text-left transition-all ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-border bg-surface hover:border-primary/40 hover:bg-primary/5'
      }`}
    >
      <div className="flex flex-1 items-center justify-start gap-2">
        <span
          className={`flex size-7 shrink-0 items-center justify-center rounded-md ${
            isSelected ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
          }`}
        >
          <MapPin className="size-3.5" />
        </span>

        <span className="min-w-0">
          <span className="block truncate text-xs font-medium text-text-primary">
            {address.street}, д. {address.house}
            {address.apartment && `, кв. ${address.apartment}`}
          </span>

          <span className="mt-0.5 block text-[11px] text-text-muted">
            {address.city}
          </span>
        </span>
      </div>

      {isSelected && (
        <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-white">
          <Check className="size-2.5" />
        </span>
      )}
    </button>
  );
};

export default AddressCard;

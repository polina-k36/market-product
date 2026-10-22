import { MapPin, MessageSquare, Pencil, Trash2 } from 'lucide-react';
import type { IAddress } from '../../types/address.types';

interface IAddressCardForUserSettingsProps {
  address: IAddress;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const AddressCardForUserSettings = ({
  address,
  onEdit,
  onDelete,
}: IAddressCardForUserSettingsProps) => {
  const fullAddress = `г. ${address.city}, ул. ${address.street}, д. ${address.house}${address.apartment ? ` , кв. ${address.apartment}` : ''}`;

  console.log(address);
  return (
    <div className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary/30">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MapPin className="size-5" aria-hidden="true" />
            </div>
            <p className="flex-1 text-sm leading-6 text-text-primary">
              {fullAddress}
            </p>
            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                className="inline-flex min-h-8 cursor-pointer items-center gap-1.5 text-xs font-medium text-text-muted transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                onClick={() => onEdit(address.id)}
              >
                <Pencil className="size-3.5" aria-hidden="true" />
                Изменить
              </button>

              <button
                type="button"
                className="inline-flex min-h-8 cursor-pointer items-center gap-1.5 text-xs font-medium text-text-muted transition-colors hover:text-danger focus-visible:outline-2 focus-visible:outline-danger"
                onClick={() => onDelete(address.id)}
              >
                <Trash2 className="size-3.5" aria-hidden="true" />
                Удалить
              </button>
            </div>
          </div>

          {address.comment && (
            <div className="mt-3 rounded-lg bg-surface-muted p-3">
              <div className="mb-1.5 flex items-center gap-1.5 text-text-muted">
                <MessageSquare className="size-3.5" aria-hidden="true" />
                <span className="text-xs font-medium">Комментарий курьеру</span>
              </div>

              <p className="text-sm leading-5 whitespace-pre-line text-text-secondary">
                {address.comment.trim()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressCardForUserSettings;

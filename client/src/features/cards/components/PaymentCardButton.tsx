import { Check, CreditCard } from 'lucide-react';
import type { IUserCard } from '../types/card.types';

interface IPaymentCardButtonProps {
  card: IUserCard;
  isSelected: boolean;
  handleSelectCard: (id: number) => void;
}

const PaymentCardButton = ({
  card,
  isSelected,
  handleSelectCard,
}: IPaymentCardButtonProps) => {
  return (
    <button
      key={card.id}
      type="button"
      onClick={() => handleSelectCard(card.id)}
      className={`flex min-w-32.5 cursor-pointer items-start gap-3 rounded-lg border px-2.5 py-2 text-left transition-all ${
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
          <CreditCard className="size-3.5" />
        </span>

        <span className="min-w-0">
          <span className="block text-xs font-medium text-text-primary uppercase">
            {card.cardBrand}
          </span>

          <span className="block text-[11px] text-text-muted">
            •••• {card.cardLast4}
          </span>
        </span>
      </div>

      {isSelected && (
        <span className="ml-auto flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-white">
          <Check className="size-2.5" />
        </span>
      )}
    </button>
  );
};

export default PaymentCardButton;

import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/buttons/Button';

interface ICartFooterProps {
  totalPrice: number;
  onCheckout: () => void;
}

const CartFooter = ({ totalPrice, onCheckout }: ICartFooterProps) => {
  const finalPrice = totalPrice;

  return (
    <footer className="shrink-0 border-t border-border bg-surface px-5 pt-4 pb-5">
      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between pt-3 text-base font-bold text-text-primary">
          <span>Итого</span>

          <span className="text-lg text-primary">
            {finalPrice.toFixed(2)} ₽
          </span>
        </div>
      </div>

      <Button
        variant="primary"
        type="button"
        onClick={onCheckout}
        className="w-full"
      >
        Оформить заказ
        <ArrowRight className="size-4" />
      </Button>
    </footer>
  );
};

export default CartFooter;

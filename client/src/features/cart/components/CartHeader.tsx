import { ShoppingCart, X } from 'lucide-react';
import ButtonIcon from '@/components/ui/buttons/ButtonIcon';
import { useCartStore } from '../store/cart.store';

interface ICartHeaderProps {
  totalItems: number;
}

const CartHeader = ({ totalItems }: ICartHeaderProps) => {
  const itemsLabel =
    totalItems === 1 ? 'товар' : totalItems < 5 ? 'товара' : 'товаров';

  const closeCart = useCartStore((state) => state.closeCart);

  const onClose = () => {
    closeCart();
    document.body.style.overflowY = 'scroll';
  };

  return (
    <header className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <ShoppingCart className="size-5" />
        </div>

        <div>
          <h2 className="text-base font-bold text-text-primary">Корзина</h2>

          <p className="mt-0.5 text-xs text-text-secondary">
            {totalItems} {itemsLabel}
          </p>
        </div>
      </div>

      <ButtonIcon
        variant="transparent"
        type="button"
        aria-label="Закрыть корзину"
        onClick={onClose}
        className="hover:bg-surface-muted"
      >
        <X className="size-5" />
      </ButtonIcon>
    </header>
  );
};

export default CartHeader;

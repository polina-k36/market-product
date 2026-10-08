import { Image, Trash2 } from 'lucide-react';
import { useCartItemOperations } from '../hooks/use-cart-item-operations';
import CartItemQuantityControl from './CartItemQuantityControl';

interface ICartProductCardProps {
  product: {
    productId: number;
    imageUrl: string;
    title: string;
    price: number;
    unit: string;
    quantity: string;
  };
}

const CartProductCard = ({ product }: ICartProductCardProps) => {
  const total = Number(product.quantity) * product.price;
  const { increment, decrement, remove, setQuantity } = useCartItemOperations(
    product.productId,
    Number(product.quantity),
  );
  //TODO: сделать карточку ссылкой на продукт
  //BUG: название продукта залазит на иконку если не помещается
  //FIXME: при декременте продукта количество которого меньше 1 ничего не происходит подумать и решить
  return (
    <div className="flex w-full items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition-shadow duration-200 hover:shadow-sm sm:gap-5 sm:p-5">
      <div className="flex size-18 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface-muted sm:size-20">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <Image className="size-8 text-text-muted" />
        )}
      </div>

      <div className="min-w-0 flex-1 self-stretch">
        <div className="flex h-full flex-col items-start justify-between">
          <div>
            <h4 className="truncate text-sm font-semibold text-text-primary sm:text-base">
              {product.title}
            </h4>

            <p className="mt-1 text-xs text-text-secondary">
              {product.price.toFixed(2)} ₽ / {product.unit}
            </p>
          </div>

          <CartItemQuantityControl
            quantity={Number(product.quantity)}
            onIncrement={increment}
            onDecrement={decrement}
            onSetQuantity={setQuantity}
          />
        </div>
      </div>

      <div className="flex h-full shrink-0 flex-col items-end justify-between">
        <button
          type="button"
          aria-label={`Удалить ${product.title} из корзины`}
          onClick={() => remove()}
          className="flex size-8 items-center justify-center rounded-lg text-text-muted transition-colors duration-200 hover:bg-danger/10 hover:text-danger focus:ring-2 focus:ring-danger/30 focus:outline-none"
        >
          <Trash2 className="size-4" />
        </button>

        <span className="mt-3 text-sm font-bold text-text-primary sm:text-base">
          {total.toFixed(2)} ₽
        </span>
      </div>
    </div>
  );
};

export default CartProductCard;

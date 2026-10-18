//TODO: сделать карточку ссылкой на продукт
//BUG: название продукта залазит на иконку если не помещается
//FIXME: при декременте продукта количество которого меньше 1 ничего не происходит подумать и решить

import { useCartItemOperations } from '../hooks/use-cart-item-operations';
import { useReservationItemOperations } from '@/features/reservations/hooks/use-reservation-item-operations';
import CartItemQuantityControl from './CartItemQuantityControl';
import { Image, Trash2, AlertTriangle, PackageX } from 'lucide-react';
import { env } from '@/config/env';
import { useShopStore } from '@/stores/shop/shop.store';

interface ICartProductCardProps {
  product: {
    productId: number;
    imageKey: string;
    title: string;
    price: number;
    unit: string;
    quantity: number;
    productStocks: {
      shopId: number;
      quantity: number;
    }[];
  };
  mode:
    | { name: 'order'; reservationId: number }
    | { name: 'cart'; reservationId?: never };
}

const CartProductCard = ({ product, mode }: ICartProductCardProps) => {
  const quantity = Number(product.quantity);
  const total = quantity * product.price;

  const { shopId } = useShopStore();

  const stock = product.productStocks
    ? product.productStocks.find((item) => item.shopId === shopId)
    : undefined;
  const available = Math.max(0, Number(stock?.quantity ?? 0));

  const isOutOfStock = available <= 0;
  const isInsufficient = !isOutOfStock && quantity > available;

  const {
    increment: incrementCart,
    decrement: decrementCart,
    remove: removeCart,
    setQuantity: setQuantityCart,
  } = useCartItemOperations(product.productId, quantity);

  const {
    increment: incrementReservationItem,
    decrement: decrementReservationItem,
    remove: removeReservationItem,
    setQuantity: setQuantityReservationItem,
  } = useReservationItemOperations(mode.reservationId, product.productId);

  const onIncrement = () => {
    if (mode.name === 'order') incrementReservationItem();
    else incrementCart();
  };

  const onDecrement = () => {
    if (mode.name === 'order') decrementReservationItem();
    else decrementCart();
  };

  const onRemove = () => {
    if (mode.name === 'order') removeReservationItem();
    else removeCart();
  };

  const onSetQuantity = (value: number) => {
    if (mode.name === 'order') setQuantityReservationItem(value);
    else setQuantityCart(value);
  };

  return (
    <div
      className={`flex w-full items-center gap-3 rounded-2xl border p-3 transition-all duration-200 sm:gap-5 sm:p-5 ${
        isOutOfStock
          ? 'border-danger/30 bg-danger/5'
          : isInsufficient
            ? 'border-warning/40 bg-warning/5'
            : 'border-border bg-surface hover:shadow-sm'
      }`}
    >
      <div
        className={`flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl sm:size-20 ${
          isOutOfStock ? 'bg-surface-muted opacity-60' : 'bg-surface-muted'
        }`}
      >
        {product.imageKey ? (
          <img
            src={`${env.s3Url}/${product.imageKey}`}
            alt={product.title}
            className={`h-full w-full object-cover ${
              isOutOfStock ? 'grayscale' : ''
            }`}
          />
        ) : (
          <Image className="size-8 text-text-muted" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 self-stretch">
        <div className="min-w-0">
          <h4 className="truncate text-sm font-semibold text-text-primary sm:text-base">
            {product.title}
          </h4>

          <p className="mt-1 text-xs text-text-secondary">
            {product.price.toFixed(2)} ₽ / {product.unit}
          </p>

          {isOutOfStock && (
            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-danger">
              <PackageX className="size-4 shrink-0" />
              <span>Нет в наличии</span>
            </div>
          )}

          {isInsufficient && (
            <div className="mt-2 flex items-start gap-1.5 text-xs font-medium text-warning">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              <span>
                Доступно только {available} {product.unit}
              </span>
            </div>
          )}
        </div>

        <CartItemQuantityControl
          quantity={quantity}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onSetQuantity={onSetQuantity}
        />
      </div>

      <div className="flex shrink-0 flex-col items-end justify-between self-stretch">
        <button
          type="button"
          aria-label={`Удалить ${product.title}`}
          onClick={onRemove}
          className="flex size-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-danger/10 hover:text-danger focus:ring-2 focus:ring-danger/30 focus:outline-none"
        >
          <Trash2 className="size-4" />
        </button>

        <span className="mt-3 text-right text-sm font-bold text-text-primary sm:text-base">
          {total.toFixed(2)} ₽
        </span>
      </div>
    </div>
  );
};

export default CartProductCard;

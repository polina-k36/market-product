import { ShoppingBag } from 'lucide-react';
import type { IOrderItems } from '../../types/order.types';

interface IOrderItemsProps {
  items: IOrderItems[];
}

const OrderItems = ({ items }: IOrderItemsProps) => {
  return (
    <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
          <ShoppingBag className="size-4" />
        </div>

        <div>
          <h2 className="text-base font-bold text-text-primary">Товары</h2>

          <p className="text-xs text-text-muted">
            {items.length}{' '}
            {items.length === 1
              ? 'позиция'
              : items.length < 5
                ? 'позиции'
                : 'позиций'}
          </p>
        </div>
      </div>

      <div className="divide-y divide-border">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 py-4 first:pt-0 last:pb-0">
            <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-surface-muted">
              <img
                src={item.product.imageKey}
                className="size-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-text-primary">
                {item.product.title}
              </h3>

              <p className="mt-1 line-clamp-2 text-xs text-text-muted">
                {item.product.description}
              </p>

              <p className="mt-2 text-xs text-text-secondary">
                {item.quantity} {item.product.unit.shortTitle}. × {item.price} ₽
              </p>
            </div>

            <p className="shrink-0 text-sm font-bold text-text-primary">
              {(Number(item.quantity) * Number(item.price)).toFixed(2)} ₽
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderItems;

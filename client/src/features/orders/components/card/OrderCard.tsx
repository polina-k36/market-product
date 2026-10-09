import Button from '@/components/ui/buttons/Button';
import { ChevronRight, MapPin, ShoppingBag } from 'lucide-react';
import type { OrderStatus } from '../../types/order.types';
import { useNavigate } from 'react-router';
import { orderStatusConfig } from '../../utils/order-status.utils';

interface IOrderCardProps {
  order: {
    id: number;
    date: Date;
    status: OrderStatus;
    itemCount: number;
    delAddress: string;
    total: number;
  };
}

const OrderCard = ({ order }: IOrderCardProps) => {
  const navigate = useNavigate();
  const statusInfo = orderStatusConfig(order.status);
  const StatusIcon = statusInfo.icon;
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm transition-all duration-200 hover:border-primary/20 hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-text-muted uppercase">
            Заказ
          </p>

          <div className="mt-0.5 flex items-baseline gap-2">
            <h3 className="text-lg font-bold tracking-tight text-text-primary">
              #{order.id}
            </h3>

            <p className="text-xs text-text-secondary">
              {order.date.toLocaleString('ru-RU')}
            </p>
          </div>
        </div>

        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1.5 text-xs font-semibold text-primary">
          <StatusIcon className="size-3.5" />
          {statusInfo.label}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-4 border-y border-border py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-text-secondary">
            <ShoppingBag className="size-4" />
          </div>

          <div>
            <p className="text-[0.7rem] text-text-muted">Товаров</p>

            <p className="text-sm font-semibold text-text-primary">
              {order.itemCount}
            </p>
          </div>
        </div>

        {order.delAddress && (
          <>
            <div className="h-8 w-px bg-border" />

            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-text-secondary">
                <MapPin className="size-4" />
              </div>

              <div className="min-w-0">
                <p className="text-[0.7rem] text-text-muted">Доставка</p>

                <p className="truncate text-sm font-medium text-text-primary">
                  {order.delAddress}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-[0.7rem] text-text-muted">Итого</p>

          <div className="mt-0.5 flex items-baseline gap-2">
            <p className="text-xl font-extrabold tracking-tight text-text-primary">
              {order.total} ₽
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          type="button"
          onClick={() => navigate(`/orders/${order.id}`)}
          className="group"
        >
          <ShoppingBag className="size-3.5" />
          <span>Подробнее</span>
          <ChevronRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default OrderCard;

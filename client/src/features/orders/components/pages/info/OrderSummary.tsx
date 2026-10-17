import {
  ChevronRight,
  RotateCcw,
  ShoppingBag,
  Truck,
  CircleX,
} from 'lucide-react';
import Button from '@/components/ui/buttons/Button';
import { useNavigate } from 'react-router';
import type { OrderStatus } from '@/features/orders/types/order.types';
import { useCancelOrder } from '@/features/orders/hooks/use-cancel-order';

interface IOrderSummaryProps {
  orderId: number;
  itemsTotal: number;
  delivery: number;
  total: number;
  status: OrderStatus;
}

const OrderSummary = ({
  orderId,
  itemsTotal,
  delivery,
  total,
  status,
}: IOrderSummaryProps) => {
  const navigate = useNavigate();
  const { mutate: cancelOrder } = useCancelOrder();
  console.log(status);

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <h2 className="text-base font-bold text-text-primary">Детали заказа</h2>
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <ShoppingBag className="size-4 text-text-muted" />
            Товары
          </div>

          <span className="text-sm font-medium text-text-primary">
            {itemsTotal.toFixed(2)} ₽
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Truck className="size-4 text-text-muted" />
            Доставка
          </div>

          <span className="text-sm font-medium text-text-primary">
            {delivery === 0 ? 'Бесплатно' : `${delivery} ₽`}
          </span>
        </div>
      </div>
      <div className="my-4 border-t border-border" />
      <div>
        <p className="text-xs text-text-muted">Итого</p>

        <p className="mt-0.5 text-2xl font-extrabold tracking-tight text-text-primary">
          {total.toFixed(2)} ₽
        </p>
      </div>
      <Button variant="primary" type="button" className="group mt-5 w-full">
        <RotateCcw className="size-3.5 transition-transform duration-500 group-hover:-rotate-360" />
        Повторить заказ
      </Button>
      {status === 'CONFIRMED' ||
      status === 'PROCESSING' ||
      status === 'PREPARING' ? (
        <Button
          variant="danger-filled"
          className="mt-2 w-full"
          onClick={() => cancelOrder(orderId)}
        >
          <CircleX className="size-3.5" />
          Отменить заказ
        </Button>
      ) : null}
      {/* //TODO: пр нажатии предоставлять выбор продуктов которые пользователь
      хочет вернуть */}
      {/* {status === 'SHIPPED' ||
      status === 'DELIVERED' ||
      status === 'READY_FOR_PICKUP' ? (
        <Button variant="danger-filled" className="mt-2 w-full">
          <RotateCcw className="size-3.5 transition-transform duration-500 group-hover:-rotate-360" />
          Вернуть заказ
        </Button>
      ) : null} */}
      <Button
        variant="transparent"
        type="button"
        onClick={() => navigate('/profile?mode=orders')}
        className="group mt-2 w-full"
      >
        Все заказы
        <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
};

export default OrderSummary;

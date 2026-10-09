import { ChevronRight, RotateCcw, ShoppingBag, Truck } from 'lucide-react';
import Button from '@/components/ui/buttons/Button';
import { useNavigate } from 'react-router';

interface IOrderSummaryProps {
  itemsTotal: number;
  delivery: number;
  total: number;
}

const OrderSummary = ({ itemsTotal, delivery, total }: IOrderSummaryProps) => {
  const navigate = useNavigate();
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

      <button
        type="button"
        onClick={() => navigate('/profile?mode=orders')}
        className="group mt-3 flex w-full cursor-pointer items-center justify-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
      >
        Все заказы
        <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};

export default OrderSummary;

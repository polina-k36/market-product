import NavButton from '@/components/ui/buttons/NavButton';
import type { OrderStatus } from '@/features/orders/types/order.types';
import { orderStatusConfig } from '@/features/orders/utils/order-status.utils';
import { useNavigate } from 'react-router';

interface IOrderHeaderProps {
  id: number;
  date: Date;
  status: OrderStatus;
}

const OrderHeader = ({ id, date, status }: IOrderHeaderProps) => {
  const navigate = useNavigate();
  const statusInfo = orderStatusConfig(status);
  const StatusIcon = statusInfo.icon;
  return (
    <header>
      <NavButton onNavigate={() => navigate('/profile?mode=orders')}>
        Назад к заказам
      </NavButton>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-wide text-text-muted uppercase">
            Заказ
          </p>

          <div className="mt-1 flex flex-wrap items-baseline gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">
              #{id}
            </h1>

            <span className="text-sm text-text-secondary">
              {date.toLocaleString('ru-RU')}
            </span>
          </div>
        </div>

        <div
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${statusInfo.bgColor} ${statusInfo.color}`}
        >
          <StatusIcon className="size-4" />
          {statusInfo.label}
        </div>
      </div>
    </header>
  );
};

export default OrderHeader;

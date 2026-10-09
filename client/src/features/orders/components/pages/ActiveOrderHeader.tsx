import { Truck, X } from 'lucide-react';
import type { OrderStatus } from '../../types/order.types';
import { useNavigate } from 'react-router';
import { orderStatusConfig } from '../../utils/order-status.utils';

interface IActiveOrder {
  id: number;
  status: OrderStatus;
}

interface IActiveOrderHeaderProps {
  activeOrders: IActiveOrder[];
}

const ActiveOrderHeader = ({ activeOrders }: IActiveOrderHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-primary text-text-inverse">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Truck className="h-5 w-5 shrink-0" />
        <span className="text-sm font-medium">Активные заказы:</span>
        <div className="flex flex-1 flex-wrap gap-3">
          {activeOrders.map((order) => {
            const info = orderStatusConfig(order.status);
            const Icon = info.icon;
            return (
              <button
                key={order.id}
                onClick={() => navigate('/profile?mode=orders')}
                className="flex cursor-pointer items-center gap-1.5 rounded-full bg-surface/20 px-3 py-1 text-sm font-medium transition-colors hover:bg-surface/30"
              >
                <Icon className="h-3.5 w-3.5" />#{order.id} - {info.label}
              </button>
            );
          })}
        </div>
        <button className="shrink-0 cursor-pointer rounded-lg p-1 transition-colors hover:bg-surface/20">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ActiveOrderHeader;

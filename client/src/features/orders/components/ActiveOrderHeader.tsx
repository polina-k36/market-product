import { Truck, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { orderStatusConfig } from '../utils/order-status.utils';
import { useActiveOrders } from '../hooks/use-active-orders';

const ActiveOrderHeader = () => {
  const navigate = useNavigate();
  const { data: activeOrders } = useActiveOrders();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  if (!activeOrders?.length || isHidden) {
    return null;
  }

  return (
    <div className="w-full bg-primary text-text-inverse">
      <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface/15">
              <Truck className="h-4 w-4" />
            </span>

            <span className="min-w-0">
              <span className="block text-sm font-semibold">
                Активные заказы
              </span>
              <span className="block text-xs text-text-inverse/75">
                {activeOrders.length}{' '}
                {activeOrders.length === 1
                  ? 'заказ'
                  : activeOrders.length < 5
                    ? 'заказа'
                    : 'заказов'}
              </span>
            </span>

            <ChevronDown
              className={`ml-1 h-4 w-4 shrink-0 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>

          <button
            type="button"
            aria-label="Скрыть панель активных заказов"
            onClick={() => setIsHidden(true)}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-surface/20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isExpanded && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
            {activeOrders.map((order) => {
              const info = orderStatusConfig(order.status);
              const Icon = info.icon;

              return (
                <button
                  key={order.id}
                  type="button"
                  onClick={() => navigate(`/orders/${order.id}`)}
                  className="flex min-w-max cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-surface/10 px-3 py-2 text-left transition-colors hover:bg-surface/20"
                >
                  <Icon className="h-4 w-4 shrink-0" />

                  <span>
                    <span className="block text-xs font-semibold">
                      Заказ #{order.id}
                    </span>
                    <span className="block text-xs text-text-inverse/75">
                      {info.label}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveOrderHeader;

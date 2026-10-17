import {
  CheckCircle,
  Clock,
  MapPin,
  Package,
  PackageCheck,
  PackageOpen,
  Truck,
} from 'lucide-react';
import type { DeliveryMethod, OrderStatus } from '../types/order.types';

interface IStatusTrackerProps {
  deliveryMethod: DeliveryMethod;
  status: OrderStatus;
  onlyTracker?: boolean;
}

const StatusTracker = ({
  deliveryMethod,
  status,
  onlyTracker = false,
}: IStatusTrackerProps) => {
  const substep =
    deliveryMethod == 'delivery'
      ? {
          key: 'SHIPPED',
          label: 'В пути',
          icon: Truck,
          desc: 'Курьер получил заказа и спешит к вам.',
        }
      : {
          key: 'READY_FOR_PICKUP',
          label: 'Готов к выдаче',
          icon: MapPin,
          desc: 'Ожидает вас в магазине', //TODO: добавление адреса
        };
  const steps = [
    {
      key: 'PROCESSING',
      label: 'Оформление',
      icon: Clock,
      desc: 'Получение данных и подтверждение заказа',
    },
    {
      key: 'CONFIRMED',
      label: 'Заказ принят',
      icon: CheckCircle,
      desc: 'Заказ отправлен на сборку.',
    },
    {
      key: 'PREPARING',
      label: 'Сборка заказа',
      icon: PackageOpen,
      desc: 'Собираем ваши продукты. Еще немного и они будут у вас.',
    },
    substep,
    {
      key: 'DELIVERED',
      label: deliveryMethod == 'delivery' ? 'Доставлен' : 'Получен',
      icon: PackageCheck,
      desc: 'Заказ был получен. Ждем вас снова!',
    },
  ];
  const activeStatusInfo = steps.filter((step) => step.key === status)
    ? steps.filter((step) => step.key === status)[0]
    : null;

  const ActiveIcon = activeStatusInfo?.icon;
  return (
    <>
      <div
        className={`${onlyTracker ? 'py-3' : 'rounded-3xl bg-surface p-6 shadow-sm'}`}
      >
        <h2 className="mb-6 text-base font-semibold text-text-primary">
          Статус заказа
        </h2>
        <div className="relative">
          <div className="absolute top-5 right-5 left-5 h-0.5 bg-border" />
          <div
            className="absolute top-5 left-5 h-0.5 bg-primary transition-all"
            style={{
              width: `${((steps.findIndex((step) => step.key === status) + 0.7) * 100) / steps.length}%`,
            }}
          />

          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.key === status;
              const isDone =
                index < steps.findIndex((s) => s.key == activeStatusInfo?.key);
              return (
                <div
                  key={step.key}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div
                    className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                      isActive
                        ? 'border-primary bg-primary text-text-inverse shadow-lg shadow-primary-soft'
                        : isDone
                          ? 'border-primary bg-primary-soft text-primary'
                          : 'border-border bg-surface text-text-secondary'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-center">
                    <p
                      className={`text-xs font-semibold ${isActive ? 'text-primary' : 'text-text-secondary'}`}
                    >
                      {step.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {!onlyTracker && (
          <div className="mt-6 flex items-center gap-3 border-t border-border px-2 pt-5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft">
              {ActiveIcon ? (
                <ActiveIcon className="h-4 w-4 text-primary" />
              ) : (
                <Package className="h-4 w-4 text-primary" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {activeStatusInfo?.label}
              </p>
              <p className="text-xs text-text-secondary">
                {activeStatusInfo?.desc}
              </p>
            </div>
            <span className="ml-auto flex items-center gap-2 rounded-full bg-primary-soft px-3 py-2 text-xs font-semibold text-primary">
              {ActiveIcon ? (
                <ActiveIcon className="h-4 w-4 text-primary" />
              ) : null}
              {activeStatusInfo?.label}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default StatusTracker;

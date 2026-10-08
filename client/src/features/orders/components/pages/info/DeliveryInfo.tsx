import { MapPin, Truck } from 'lucide-react';

interface IDeliveryInfoProps {
  address: string;
  method: string;
}

const DeliveryInfo = ({ address, method }: IDeliveryInfoProps) => {
  return (
    <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
          <Truck className="size-4" />
        </div>

        <div>
          <h2 className="text-base font-bold text-text-primary">Доставка</h2>

          <p className="text-xs text-text-muted">Информация о доставке</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 size-4 shrink-0 text-text-muted" />

          <div>
            <p className="text-xs text-text-muted">Адрес</p>

            <p className="mt-0.5 text-sm font-medium text-text-primary">
              {address}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Truck className="mt-0.5 size-4 shrink-0 text-text-muted" />

          <div>
            <p className="text-xs text-text-muted">Способ доставки</p>

            <p className="mt-0.5 text-sm font-medium text-text-primary">
              {method}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryInfo;

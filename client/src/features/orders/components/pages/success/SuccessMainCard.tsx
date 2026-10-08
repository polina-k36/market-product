import { CheckCircle, Truck } from 'lucide-react';

interface ISuccessMainCardProps {
  orderId: number;
  total: number;
  deliveryDate: Date;
}

const SuccessMainCard = ({
  orderId,
  total,
  deliveryDate,
}: ISuccessMainCardProps) => {
  return (
    <div className="rounded-3xl bg-surface p-8 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary-soft">
        <CheckCircle className="h-10 w-10 text-primary" />
      </div>
      <h1 className="mb-1 text-2xl font-bold text-text-primary">
        Заказ оформлен!
      </h1>
      <p className="mb-4 text-text-secondary">
        Номер заказа #
        <span className="font-semibold text-text-primary">{orderId}</span> на
        сумму{' '}
        <span className="font-semibold text-text-primary">
          {total.toFixed(2)} ₽
        </span>
      </p>
      <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-2 text-sm font-medium text-accent">
        <Truck className="h-4 w-4" />
        Ожидаемая доставка: {deliveryDate.toLocaleString('ru-RU')}
      </div>
    </div>
  );
};

export default SuccessMainCard;

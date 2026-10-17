import type { OrderStatus } from '@/features/orders/types/order.types';
import { CheckCircle, CreditCard, RotateCcw } from 'lucide-react';

interface IPaymentInfoProps {
  status: OrderStatus;
  card: {
    cardBrand: string;
    cardLast4: string;
  } | null;
  method: string;
  total: number;
}

const PaymentInfo = ({ status, card, method, total }: IPaymentInfoProps) => {
  return (
    <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
          <CreditCard className="size-4" />
        </div>

        <div>
          <h2 className="text-base font-bold text-text-primary">Оплата</h2>

          <p className="text-xs text-text-muted">Информация об оплате</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-surface-muted">
            <CreditCard className="size-4 text-text-secondary" />
          </div>
          <div>
            <p className="text-xs text-text-muted">Способ оплаты</p>

            <p className="mt-0.5 text-sm font-medium text-text-primary">
              {method === 'Онлайн оплата'
                ? card && card.cardBrand && card.cardLast4
                  ? `Онлайн оплата - ${card?.cardBrand} •••• ${card?.cardLast4}`
                  : 'Онлайн оплата - карта не привязана'
                : method}
            </p>
          </div>
        </div>

        {status === 'CANCELLED' || status === 'RETURNED' ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500">
            <RotateCcw className="size-3.5" />
            Возврат
          </span>
        ) : status === 'DELIVERED' || method === 'Онлайн оплата' ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
            <CheckCircle className="size-3.5" />
            Оплачено
          </span>
        ) : null}
      </div>

      <div className="mt-4 border-t border-border pt-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Сумма</span>

          <span className="text-base font-bold text-text-primary">
            {total.toFixed(2)} ₽
          </span>
        </div>
      </div>
    </section>
  );
};

export default PaymentInfo;

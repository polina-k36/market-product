import { Truck, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUserReservation } from '@/features/reservations/hooks/use-user-reservation';
import Button from '@/components/ui/buttons/Button';

const NotConfirmOrderHeader = () => {
  const navigate = useNavigate();
  const { data: reservation } = useUserReservation();
  const [isHidden, setIsHidden] = useState(false);

  if (!reservation || isHidden) {
    return null;
  }

  return (
    <div className="w-full border-b border-warning/40 bg-warning/15 text-text-primary">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warning/25">
          <Truck className="h-5 w-5 text-accent" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">
            У вас есть незавершённое оформление
          </p>

          <p className="mt-0.5 text-xs leading-relaxed text-text-secondary sm:text-sm">
            Завершите оформление резерва, прежде чем создавать новый.
          </p>

          <p className="mt-1 text-xs font-medium text-accent">
            Резерв товаров #{reservation.reservationId}
          </p>
        </div>

        <Button
          type="button"
          variant="warning-filled"
          className="group w-fit"
          onClick={() =>
            navigate(`/orders/checkout/${reservation.reservationId}`)
          }
        >
          <span className="hidden sm:inline">Продолжить</span>
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </Button>
        <button
          type="button"
          aria-label="Скрыть уведомление"
          onClick={() => setIsHidden(true)}
          className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-warning/25 hover:text-text-primary"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default NotConfirmOrderHeader;

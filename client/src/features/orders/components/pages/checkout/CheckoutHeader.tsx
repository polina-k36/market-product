import NavButton from '@/components/ui/buttons/NavButton';
import { Lock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

interface ICheckoutHeaderProps {
  isNewReservation: boolean;
}

const CheckoutHeader = ({ isNewReservation }: ICheckoutHeaderProps) => {
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header>
      <NavButton onNavigate={() => navigate('/')}>На главную</NavButton>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.8rem] font-medium tracking-wider text-text-muted">
            {currentDateTime.toLocaleString('ru-RU', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </p>

          <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            {isNewReservation
              ? 'Оформление заказа'
              : 'Продолжите оформление заказа'}
          </h1>

          <p className="mt-1 text-sm text-text-secondary">
            Проверьте данные перед оформлением
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/10 bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary">
          <Lock className="size-3.5" />
          Безопасное оформление
        </div>
      </div>
    </header>
  );
};

export default CheckoutHeader;

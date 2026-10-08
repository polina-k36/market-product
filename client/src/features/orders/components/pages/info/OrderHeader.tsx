import NavButton from '@/components/ui/buttons/NavButton';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

interface IOrderHeaderProps {
  id: number;
  date: string;
  status: string;
}

const OrderHeader = ({ id, date, status }: IOrderHeaderProps) => {
  const navigate = useNavigate();
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

            <span className="text-sm text-text-secondary">{date}</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary">
          <CheckCircle className="size-3.5" />
          {status}
        </div>
      </div>
    </header>
  );
};

export default OrderHeader;

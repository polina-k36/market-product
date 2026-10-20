import Button from '@/components/ui/buttons/Button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface IPaymentCardListErrorProps {
  onRetry: () => void;
}
const PaymentCardListError = ({ onRetry }: IPaymentCardListErrorProps) => {
  return (
    <div
      role="alert"
      className="flex flex-1 flex-col items-center gap-2 rounded-lg border border-danger/20 bg-danger/5 px-4 py-5 text-center"
    >
      <AlertCircle className="size-6 text-danger" />

      <p className="text-sm font-medium text-text-primary">
        Не удалось загрузить карты пользователя
      </p>

      <p className="text-xs text-text-secondary">
        Попробуй проверить подключение и повторить попытку.
      </p>

      <Button
        type="button"
        variant="primary"
        className="group mt-4"
        onClick={onRetry}
      >
        <RefreshCw className="size-4 transition-transform duration-300 group-hover:rotate-180" />
        Повторить
      </Button>
    </div>
  );
};

export default PaymentCardListError;

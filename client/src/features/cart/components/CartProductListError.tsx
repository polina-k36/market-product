import Button from '@/components/ui/buttons/Button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface CartProductListErrorProps {
  onRetry: () => void;
}

const CartProductListError = ({ onRetry }: CartProductListErrorProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <AlertCircle className="size-8 text-danger" />

      <div>
        <p className="text-xl font-semibold text-text-primary">
          Не удалось загрузить товары
        </p>
        <p className="mt-1 text-sm text-text-secondary">
          Проверь подключение к интернету и попробуй ещё раз.
        </p>
      </div>
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

export default CartProductListError;

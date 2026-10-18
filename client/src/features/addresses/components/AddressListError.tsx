import Button from '@/components/ui/buttons/Button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface AddressListErrorProps {
  onRetry: () => void;
}

const AddressListError = ({ onRetry }: AddressListErrorProps) => {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-xl border border-danger/20 bg-danger/5 px-5 py-8 text-center"
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-danger/10 text-danger">
        <AlertCircle className="size-5" />
      </span>

      <h3 className="mt-3 text-sm font-semibold text-text-primary">
        Не удалось загрузить магазины
      </h3>

      <p className="mt-1 max-w-xs text-sm text-text-secondary">
        Проверьте подключение к интернету и попробуйте ещё раз.
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

export default AddressListError;

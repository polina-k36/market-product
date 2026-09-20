import { CircleAlert, X } from 'lucide-react';

interface IFormErrorProps {
  message: string;
  onClose?: () => void;
}

const FormError = ({ message, onClose }: IFormErrorProps) => {
  return (
    <div
      role="alert"
      className="relative flex items-start gap-3 rounded-xl border border-danger/20 bg-danger/10 px-4 py-3 text-danger shadow-sm"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-danger/10">
        <CircleAlert className="size-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">Не удалось выполнить действие</p>

        <p className="mt-0.5 text-sm leading-5 text-text-secondary">
          {message}
        </p>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="flex size-7 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors duration-200 hover:bg-danger/10 hover:text-danger focus:ring-2 focus:ring-danger/30 focus:outline-none"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
};

export default FormError;

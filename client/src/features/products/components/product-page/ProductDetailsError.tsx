import Button from '@/components/ui/buttons/Button';
import { AlertCircle, ArrowLeft, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router';
interface IProductDetailsErrorProps {
  resetErrorBoundary: () => void;
}
const ProductDetailsError = ({
  resetErrorBoundary,
}: IProductDetailsErrorProps) => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-4 py-10 sm:px-6">
      <div className="w-full rounded-3xl border border-danger/20 bg-surface p-6 text-center shadow-sm sm:p-8">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-danger/10 text-danger">
          <AlertCircle className="size-7" />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-text-primary">
          Не удалось загрузить товар
        </h1>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-text-secondary">
          Произошла ошибка при получении информации о товаре.
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            variant="primary"
            className="group"
            onClick={resetErrorBoundary}
          >
            <RotateCcw className="size-4 transition-transform duration-400 group-hover:-rotate-360" />
            Повторить
          </Button>

          <Button
            variant="transparent"
            className="group"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Вернуться
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsError;

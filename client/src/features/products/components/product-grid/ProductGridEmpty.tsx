import Button from '@/components/ui/buttons/Button';
import { RotateCcw, SearchX } from 'lucide-react';

interface IProductGridEmptyProps {
  onClearFilters: () => void;
}

const ProductGridEmpty = ({ onClearFilters }: IProductGridEmptyProps) => {
  return (
    <div className="mt-6 flex min-h-80 flex-col items-center justify-center rounded-3xl border border-border bg-surface-muted px-6 py-10 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-primary-soft text-primary">
        <SearchX className="size-8" />
      </div>

      <h3 className="mt-5 text-xl font-bold text-text-primary">
        Товары не найдены
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-text-secondary">
        Попробуйте изменить фильтры или поисковой запрос, чтобы найти подходящие
        товары.
      </p>
      <Button variant="danger" className="group mt-4" onClick={onClearFilters}>
        <RotateCcw className="size-4 transition-transform duration-500 group-hover:rotate-360" />
        Сбросить все фильтры
      </Button>
    </div>
  );
};

export default ProductGridEmpty;

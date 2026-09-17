import Dropdown from '@/components/ui/dropdown/Dropdown';
import { ChevronDown, Minus, Settings2, X } from 'lucide-react';
import { useState } from 'react';
import { useProductFilters } from '../../hooks/use-product-filters';
import Button from '@/components/ui/buttons/Button';

const FilterPanel = () => {
  const { filters, actions } = useProductFilters();
  const [isOpen, setIsOpen] = useState(false);
  const [inputPriceTo, setInputPriceTo] = useState(filters.priceTo?.toString());
  const [inputPriceFrom, setInputPriceFrom] = useState(
    filters.priceFrom?.toString(),
  );

  const clearFilters = () => {
    setInputPriceFrom('');
    setInputPriceTo('');
    actions.setPriceRange(undefined, undefined);
    setIsOpen(false);
  };

  const applyPriceRange = () => {
    let priceFrom = inputPriceFrom ? Number(inputPriceFrom) : undefined;
    priceFrom = priceFrom
      ? Number.isNaN(priceFrom) || priceFrom < 0
        ? undefined
        : priceFrom
      : undefined;

    let priceTo = inputPriceTo ? Number(inputPriceTo) : undefined;
    priceTo = priceTo
      ? Number.isNaN(priceTo) || priceTo < 0
        ? undefined
        : priceTo
      : undefined;
    actions.setPriceRange(priceFrom, priceTo);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="transform-all mt-4 flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-surface pt-2 pr-4 pb-2 pl-4 text-text-primary duration-200 hover:shadow-md hover:shadow-primary-hover/20"
        onClick={() => setIsOpen((state) => !state)}
      >
        <Settings2 />
        <span className="font-semibold">Фильтры</span>
        <ChevronDown
          className={`rotate-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <Dropdown side="left" topHeight="sm">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Фильтры</span>
            <button
              className="flex cursor-pointer items-center justify-center gap-1 text-[0.85rem] text-primary transition-colors duration-200 hover:text-primary-hover"
              onClick={clearFilters}
            >
              <X className="size-4" />
              Сбросить
            </button>
          </div>
          <div className="mt-4">
            <p>Цена, ₽</p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <input
                value={inputPriceFrom}
                type="number"
                onChange={(e) => setInputPriceFrom(e.currentTarget.value)}
                min={0}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <Minus className="w-10" />
              <input
                value={inputPriceTo}
                type="number"
                onChange={(e) => setInputPriceTo(e.currentTarget.value)}
                min={0}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>
          <Button
            variant="primary"
            className="mt-4 w-full"
            onClick={applyPriceRange}
          >
            Применить
          </Button>
        </Dropdown>
      )}
    </div>
  );
};

export default FilterPanel;

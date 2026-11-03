import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const PERIOD_OPTIONS = [7, 30, 100, 365];

interface ReportPeriodSelectProps {
  period: number;
  onChange: (value: number) => void;
}

const ReportPeriodSelect = ({ period, onChange }: ReportPeriodSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(String(period));

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(String(period));
  }, [period]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (value: string) => {
    setInputValue(value);

    const parsedValue = Number(value);

    if (
      value !== '' &&
      Number.isInteger(parsedValue) &&
      parsedValue >= 1 &&
      parsedValue <= 3650
    ) {
      onChange(parsedValue);
    }
  };

  const handleSelect = (days: number) => {
    setInputValue(String(days));
    onChange(days);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <label
        htmlFor="report-period"
        className="text-sm font-medium text-text-secondary"
      >
        Период отчёта
      </label>

      <div ref={containerRef} className="relative w-44">
        <div
          className={`bg-bg-secondary flex items-center overflow-hidden rounded-xl border transition-colors ${
            isOpen
              ? 'border-primary ring-2 ring-primary/20'
              : 'hover:border-border-hover border-border'
          }`}
        >
          <input
            id="report-period"
            type="number"
            min={1}
            max={3650}
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setIsOpen(false);
              if (e.key === 'ArrowDown') setIsOpen(true);
              if (e.key === 'Enter') setIsOpen(false);
            }}
            className="w-full min-w-0 bg-transparent px-4 py-2.5 text-sm font-medium text-text-primary outline-none"
          />

          <span className="shrink-0 pr-3 text-sm text-text-secondary">
            дней
          </span>

          <button
            type="button"
            aria-label="Открыть варианты периода"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="hover:bg-bg-hover flex h-full shrink-0 items-center border-l border-border px-3 text-text-secondary transition-colors hover:text-text-primary"
          >
            <ChevronDown
              size={16}
              className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-background p-1.5 shadow-lg">
            <p className="px-3 py-2 text-xs font-medium text-text-secondary">
              Популярные периоды
            </p>

            {PERIOD_OPTIONS.map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => handleSelect(days)}
                className="hover:bg-bg-hover flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-text-primary transition-colors"
              >
                <span>{days} дней</span>

                {period === days && (
                  <Check size={16} className="text-primary" />
                )}
              </button>
            ))}

            <div className="mt-1 border-t border-border px-3 py-2 text-xs text-text-secondary">
              Можно ввести своё значение
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPeriodSelect;

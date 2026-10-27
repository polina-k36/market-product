import { ChevronDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SelectHTMLAttributes } from 'react';

export interface ISelectOption {
  value: string | number;
  label: string;
}

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  icon: LucideIcon;
  options: ISelectOption[];
  valid?: boolean;
  placeholder?: string;
}

const Select = ({
  icon: Icon,
  options,
  value,
  valid,
  placeholder = 'Выберите значение',
  className,
  ...attributes
}: ISelectProps) => {
  const validStyles =
    valid === true
      ? 'border-primary bg-primary-soft/30'
      : valid === false
        ? 'border-danger bg-danger/10'
        : 'border-transparent';

  return (
    <div
      className={`relative flex w-full max-w-4xl items-start ${className ?? ''}`}
    >
      <Icon className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-text-muted" />

      <select
        value={value}
        className={`w-full appearance-none rounded-xl border-2 bg-surface-muted py-2 pr-10 pl-12 text-base text-text-primary transition-all duration-200 focus:border-primary focus:bg-surface focus:outline-none ${validStyles} ${value === '' ? 'text-text-muted' : ''}`}
        {...attributes}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-text-muted" />
    </div>
  );
};

export default Select;

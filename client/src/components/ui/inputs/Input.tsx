import type { LucideIcon } from 'lucide-react';
import type { InputHTMLAttributes } from 'react';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
}

const Input = ({
  icon: Icon,
  className,
  children,
  ...attributes
}: IInputProps) => {
  return (
    <div
      className={`relative flex w-full max-w-4xl items-start ${className ?? ''}`}
    >
      <Icon className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-text-muted" />
      <input
        className="w-full rounded-xl border-2 border-transparent bg-surface-muted pt-2 pr-10 pb-2 pl-12 text-base transition-all duration-200 focus:border-primary focus:bg-surface focus:outline-none"
        {...attributes}
      />
      {children}
    </div>
  );
};

export default Input;

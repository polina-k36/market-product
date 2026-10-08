import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: 'primary' | 'transparent' | 'danger';
}

const Button = ({
  children,
  variant,
  className,
  ...attributes
}: IButtonProps) => {
  const variants = {
    primary:
      'bg-primary text-text-inverse hover:bg-primary-hover focus:ring-2 focus:ring-primary/50 disabled:bg-primary/70',
    transparent:
      'bg-surface text-text-primary border-border hover:bg-surface-muted',
    danger: 'bg-transparent text-danger border-danger hover:bg-danger/10',
  };
  return (
    <button
      {...attributes}
      className={`flex cursor-pointer items-center justify-center gap-4 rounded-xl px-5 py-2.5 text-[0.875rem] font-semibold transition-colors duration-200 ease-in focus:outline-none disabled:bg-primary/30 ${variants[variant]} ${className ?? ''}`}
    >
      {children}
    </button>
  );
};

export default Button;

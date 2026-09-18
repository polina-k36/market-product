import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isActive?: boolean;
  variant: 'primary' | 'transparent';
}

const ButtonIcon = ({
  children,
  isActive,
  variant,
  className,
  ...attributes
}: IButtonIconProps) => {
  const variants = {
    primary:
      'bg-primary text-text-inverse shadow-sm transition-all duration-200 hover:bg-primary-hover hover:shadow-md focus:ring-2 focus:ring-primary/40 focus:outline-none',
    transparent: `${isActive ? 'bg-surface-muted outline-none' : 'bg-transparent hover:bg-surface-muted'}`,
  };
  return (
    <button
      {...attributes}
      className={`flex size-11 cursor-pointer items-center justify-center rounded-xl transition-colors duration-200 ease-in ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonIcon;

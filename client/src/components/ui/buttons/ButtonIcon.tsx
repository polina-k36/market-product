import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isActive: boolean;
}

const ButtonIcon = ({
  children,
  isActive,
  className,
  ...attributes
}: IButtonIconProps) => {
  return (
    <button
      {...attributes}
      className={`flex cursor-pointer items-center justify-center rounded-xl p-2 transition-colors duration-200 ease-in ${isActive ? 'bg-surface-muted outline-none' : 'bg-transparent hover:bg-surface-muted'} ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonIcon;

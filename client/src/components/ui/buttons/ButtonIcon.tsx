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
      className={`flex items-center justify-center p-2 rounded-xl cursor-pointer transition-colors duration-200 ease-in ${isActive ? 'outline-none bg-surface-muted' : 'bg-transparent hover:bg-surface-muted'} ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonIcon;

import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

interface INavButtonProps {
  onNavigate: () => void;
  children: ReactNode;
  className?: string;
}

const NavButton = ({ children, className, onNavigate }: INavButtonProps) => {
  return (
    <button
      onClick={onNavigate}
      className={`group mb-6 inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm font-semibold text-text-secondary shadow-sm transition-all duration-200 hover:border-primary/20 hover:bg-primary-soft hover:text-primary ${className}`}
    >
      <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
      {children}
    </button>
  );
};

export default NavButton;

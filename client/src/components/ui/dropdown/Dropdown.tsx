import type { ReactNode } from 'react';

interface IDropdownProps {
  children: ReactNode;
}

const Dropdown = ({ children }: IDropdownProps) => {
  return (
    <div className="absolute right-0 top w-72 top-[calc(100%+1.5rem)] bg-surface rounded-xl overflow-hidden z-index-50 -translate-y-2 transition-all duration-200 ease-in shadow-xl p-4">
      {children}
    </div>
  );
};

export default Dropdown;

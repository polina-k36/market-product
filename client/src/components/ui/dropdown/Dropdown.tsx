import type { ReactNode } from 'react';

interface IDropdownProps {
  children: ReactNode;
}

const Dropdown = ({ children }: IDropdownProps) => {
  return (
    <div className="top absolute top-[calc(100%+1.5rem)] right-0 z-50 w-72 -translate-y-2 overflow-hidden rounded-xl bg-surface p-4 shadow-xl transition-all duration-200 ease-in">
      {children}
    </div>
  );
};

export default Dropdown;

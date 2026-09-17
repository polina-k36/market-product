import type { ReactNode } from 'react';

interface IDropdownProps {
  children: ReactNode;
  side: 'left' | 'right';
  topHeight?: 'sm' | 'md' | 'lg';
}

const Dropdown = ({ children, side, topHeight = 'md' }: IDropdownProps) => {
  const sides = {
    left: 'left-0',
    right: 'right-0',
  };
  const topHeights = {
    sm: `top-[calc(100%+1rem)]`,
    md: `top-[calc(100%+1.5rem)]`,
    lg: `top-[calc(100%+2rem)]`,
  };
  return (
    <div
      className={`top absolute ${topHeights[topHeight]} ${sides[side]} z-50 w-72 -translate-y-2 overflow-hidden rounded-xl bg-surface p-4 shadow-xl transition-all duration-200 ease-in`}
    >
      {children}
    </div>
  );
};

export default Dropdown;

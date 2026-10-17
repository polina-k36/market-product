import type { ReactNode, KeyboardEvent } from 'react';

interface IDropdownProps {
  children: ReactNode;
  side: 'left' | 'right' | 'left-center' | 'right-center';
  topHeight?: 'sm' | 'md' | 'lg';

  role?: 'dialog' | 'menu' | 'listbox';
  ariaLabel?: string;
  ariaModal?: boolean;
  onClose?: () => void;
  className?: string;
}

const Dropdown = ({
  children,
  side,
  topHeight = 'md',
  role = 'dialog',
  ariaLabel = 'Меню',
  ariaModal,
  onClose,
  className = '',
}: IDropdownProps) => {
  const positions = {
    left: 'left-0',
    right: 'right-0',
    'left-center': 'left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0',
    'right-center':
      'left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0',
  };

  const topHeights = {
    sm: 'top-[calc(100%+1rem)]',
    md: 'top-[calc(100%+1.5rem)]',
    lg: 'top-[calc(100%+2rem)]',
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose?.();
    }
  };

  const isCentered = side.endsWith('-center');

  return (
    <div
      role={role}
      aria-label={ariaLabel}
      aria-modal={ariaModal}
      onKeyDown={handleKeyDown}
      className={`${positions[side]} z-50 ${
        isCentered
          ? 'fixed top-16 w-[calc(100vw-2rem)] max-w-lg sm:absolute sm:top-13 sm:w-[min(28rem,calc(100vw-2rem))] md:top-17'
          : `absolute ${topHeights[topHeight]} w-72`
      } overflow-y-auto rounded-xl bg-surface p-4 shadow-xl transition-all duration-200 ease-out ${className}`}
    >
      {children}
    </div>
  );
};

export default Dropdown;

import type { ReactNode } from 'react';

interface IHorizontalScrollProps {
  children: ReactNode;
  className?: string;
  gap?: string;
  fade?: boolean;
}

const HorizontalScroll = ({
  children,
  className,
  gap,
  fade = true,
}: IHorizontalScrollProps) => {
  return (
    <div className="relative mt-4">
      <div
        className={`flex items-center ${gap ?? 'gap-3'} scrollbar-none overflow-x-auto pr-6 ${className}`}
      >
        {children}
      </div>

      {fade && (
        <div className="pointer-events-none absolute top-0 right-0 h-full w-10 bg-linear-to-l from-background to-transparent md:hidden" />
      )}
    </div>
  );
};

export default HorizontalScroll;

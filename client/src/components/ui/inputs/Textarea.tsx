import type { LucideIcon } from 'lucide-react';
import type { TextareaHTMLAttributes } from 'react';

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon: LucideIcon;
  valid?: boolean;
}

const Textarea = ({
  icon: Icon,
  className,
  children,
  valid,
  ...attributes
}: ITextareaProps) => {
  const validStyles =
    valid === true
      ? 'border-primary bg-primary-soft/30'
      : valid === false
        ? 'border-danger bg-danger/10'
        : 'border-transparent';

  return (
    <div
      className={`relative flex w-full max-w-4xl items-start ${className ?? ''}`}
    >
      <Icon className="absolute top-4 left-4 size-4.5 text-text-muted" />

      <textarea
        className={`min-h-24 w-full resize-y rounded-xl border-2 bg-surface-muted px-4 pt-3 pb-3 pl-12 text-base transition-all duration-200 focus:bg-surface focus:outline-none ${validStyles}`}
        {...attributes}
      />

      {children}
    </div>
  );
};

export default Textarea;

import { IMaskInput } from 'react-imask';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import type { ReactMaskProps } from 'react-imask';

interface IMaskedInputProps extends Omit<
  ReactMaskProps<HTMLInputElement>,
  'mask' | 'onAccept'
> {
  icon: LucideIcon;
  mask: string;
  placeholder?: string;
  valid?: boolean;
  className?: string;
  onAccept?: (value: string) => void;
  children?: ReactNode;
}

const MaskedInput = ({
  icon: Icon,
  mask,
  placeholder,
  className,
  children,
  valid,
  onAccept,
  ...attributes
}: IMaskedInputProps) => {
  const validStyles =
    valid === true
      ? 'border-primary bg-primary-soft/30'
      : valid === false
        ? 'border-danger bg-danger/10'
        : 'border-transparent';

  return (
    <div
      className={`relative flex w-full max-w-4xl items-start ${
        className ?? ''
      }`}
    >
      <Icon className="absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-text-muted" />

      <IMaskInput
        {...attributes}
        mask={mask}
        placeholder={placeholder}
        onAccept={onAccept}
        className={`w-full rounded-xl border-2 bg-surface-muted pt-2 pr-10 pb-2 pl-12 text-base transition-all duration-200 focus:bg-surface focus:outline-none ${validStyles}`}
      />

      {children}
    </div>
  );
};

export default MaskedInput;

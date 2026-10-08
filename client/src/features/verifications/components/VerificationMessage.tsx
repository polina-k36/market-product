import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import type { ReactNode } from 'react';

type VerificationMessageVariant = 'error' | 'success' | 'info';

interface IVerificationMessageProps {
  variant: VerificationMessageVariant;
  children: ReactNode;
}

const styles = {
  error: {
    wrapper: 'border-danger/20 bg-danger/5 text-danger',
    icon: AlertCircle,
  },
  success: {
    wrapper: 'border-success/20 bg-success/5 text-success',
    icon: CheckCircle2,
  },
  info: {
    wrapper: 'border-primary/20 bg-primary-soft text-primary',
    icon: Info,
  },
};

const VerificationMessage = ({
  variant,
  children,
}: IVerificationMessageProps) => {
  const { wrapper, icon: Icon } = styles[variant];

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-xs font-medium ${wrapper}`}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />

      <span className="leading-5">{children}</span>
    </div>
  );
};

export default VerificationMessage;

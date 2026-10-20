import { CheckCircle2, CircleX, Info, TriangleAlert, X } from 'lucide-react';
import type { ReactNode } from 'react';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface INotificationAction {
  label: string;
  onClick: () => void;
}

export interface INotificationProps {
  type?: NotificationType;
  title: string;
  description?: ReactNode;
  onClose?: () => void;
  action?: INotificationAction;
  className?: string;
}

const styles: Record<
  NotificationType,
  {
    container: string;
    iconContainer: string;
    icon: typeof Info;
  }
> = {
  info: {
    container: 'border-blue-200 bg-blue-50',
    iconContainer: 'bg-blue-500 text-white',
    icon: Info,
  },
  success: {
    container: 'border-emerald-200 bg-emerald-50',
    iconContainer: 'bg-emerald-500 text-white',
    icon: CheckCircle2,
  },
  warning: {
    container: 'border-amber-200 bg-amber-50',
    iconContainer: 'bg-amber-500 text-white',
    icon: TriangleAlert,
  },
  error: {
    container: 'border-red-200 bg-red-50',
    iconContainer: 'bg-red-500 text-white',
    icon: CircleX,
  },
};

const Notification = ({
  type = 'info',
  title,
  description,
  onClose,
  action,
  className = '',
}: INotificationProps) => {
  const style = styles[type];
  const Icon = style.icon;

  return (
    <div className="m-auto mt-2.5 w-full max-w-6xl animate-notification-enter px-4 sm:px-6 lg:px-8">
      <section
        role={type === 'error' ? 'alert' : 'status'}
        className={`flex w-full items-start gap-3 rounded-xl border p-4 shadow-sm ${style.container} ${className}`}
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${style.iconContainer}`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-text-primary">{title}</h3>

          {description && (
            <div className="mt-1 text-sm leading-relaxed text-text-muted">
              {description}
            </div>
          )}

          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className="mt-3 inline-flex min-h-8 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-primary transition-colors hover:bg-border/40 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              {action.label}
            </button>
          )}
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть уведомление"
            className="shrink-0 rounded-md p-1 text-text-muted transition-colors hover:bg-black/5 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </section>
    </div>
  );
};

export default Notification;

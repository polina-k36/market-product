import type { ReactNode } from 'react';
import { Plus, Search } from 'lucide-react';

interface IAdminTableLayoutProps {
  title: string;
  description: string;
  count: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  actionLabel?: string;
  onAction?: () => void;
  toolbar?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

function AdminTableLayout({
  title,
  description,
  count,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Поиск...',
  actionLabel = 'Добавить',
  onAction,
  toolbar,
  children,
  footer,
}: IAdminTableLayoutProps) {
  return (
    <section className="min-w-0 space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
              {title}
            </h2>

            <span className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-text-secondary">
              {count}
            </span>
          </div>

          <p className="mt-1 text-sm text-text-secondary">{description}</p>
        </div>

        {onAction && (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-text-inverse transition-colors hover:bg-primary-hover"
          >
            <Plus size={18} />
            {actionLabel}
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="relative w-full sm:max-w-sm">
            <Search
              size={18}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-text-muted"
            />

            <input
              type="search"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-xl border border-border bg-background py-2.5 pr-3 pl-10 text-sm text-text-primary transition-colors outline-none placeholder:text-text-muted focus:border-primary"
            />
          </div>

          {toolbar}
        </div>

        {children}

        {footer && (
          <div className="border-t border-border px-4 py-3.5 sm:px-5">
            {footer}
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminTableLayout;

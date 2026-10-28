import { useState, type ReactNode } from 'react';
import {
  Store,
  LogOut,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  Package,
  Users,
  Tags,
  CreditCard,
  ShieldCheck,
  Truck,
  Receipt,
  FileText,
  TrendingDown,
  BarChart3,
  CalendarDays,
  ChartNoAxesCombined,
  CircleDollarSign,
  Layers,
  type LucideIcon,
} from 'lucide-react';
import { useAuthStore } from '@/stores/auth/auth.store';
import { useLogout } from '@/features/auth/hooks/use-logout';
import { useNavigate } from 'react-router';
import NotificationLayout from '../notification-layout/NotificationLayout';

interface INavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface INavigationGroup {
  id: string;
  label: string;
  items: INavigationItem[];
}

const navigationGroups: INavigationGroup[] = [
  {
    id: 'directories',
    label: 'Справочники',
    items: [
      { id: 'products', label: 'Продукты', icon: Package },
      { id: 'users', label: 'Пользователи', icon: Users },
      { id: 'shops', label: 'Магазины', icon: Store },
      { id: 'categories', label: 'Категории', icon: Tags },
      { id: 'payments', label: 'Способы оплаты', icon: CreditCard },
      { id: 'roles', label: 'Роли', icon: ShieldCheck },
      { id: 'suppliers', label: 'Поставщики', icon: Truck },
    ],
  },
  {
    id: 'documents',
    label: 'Накладные и чеки',
    items: [
      { id: 'checks', label: 'Чеки', icon: Receipt },
      { id: 'incoming-invoices', label: 'Поставки', icon: FileText },
      { id: 'expenses-invoices', label: 'Расходы', icon: TrendingDown },
    ],
  },
  {
    id: 'reports',
    label: 'Отчёты',
    items: [
      {
        id: 'orders-by-date',
        label: 'Количество заказов по датам',
        icon: CalendarDays,
      },
      {
        id: 'average-check',
        label: 'Средняя сумма чека',
        icon: CircleDollarSign,
      },
      {
        id: 'orders-by-status',
        label: 'Отменённые и выполненные заказы',
        icon: BarChart3,
      },
      {
        id: 'profit-by-period',
        label: 'Прибыль филиалов за период',
        icon: ChartNoAxesCombined,
      },
      {
        id: 'popular-categories',
        label: 'Популярные категории',
        icon: Layers,
      },
    ],
  },
];

interface IMainAdminLayoutProps {
  children: ReactNode;
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export default function MainAdminLayout({
  children,
  activeSection,
  onSectionChange,
}: IMainAdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([]);

  const { clearAuth } = useAuthStore();
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  const onLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        clearAuth();
        navigate('/');
      },
    });
  };

  const activeItem = navigationGroups
    .flatMap((group) => group.items)
    .find((item) => item.id === activeSection);

  const pageTitle = activeItem?.label ?? 'Панель управления';

  const handleSectionChange = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMobileMenuOpen(false);
  };

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups((previous) =>
      previous.includes(groupId)
        ? previous.filter((id) => id !== groupId)
        : [...previous, groupId],
    );
  };

  const toggleSidebar = () => {
    setIsCollapsed((previous) => !previous);
  };

  const isGroupCollapsed = (groupId: string) =>
    collapsedGroups.includes(groupId);

  return (
    <NotificationLayout>
      <div className="min-h-screen bg-background text-text-primary">
        {isMobileMenuOpen && (
          <button
            type="button"
            aria-label="Закрыть меню"
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
          />
        )}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-67.5 flex-col border-r border-border bg-surface transition-[width,transform] duration-200 lg:${isCollapsed ? 'w-19' : 'w-67.5'} ${
            isMobileMenuOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0'
          } `}
          style={{
            width: undefined,
          }}
        >
          <div
            className={`flex h-19 shrink-0 items-center border-b border-border px-4 ${isCollapsed ? 'lg:justify-center lg:px-2' : 'justify-between'} `}
          >
            <button
              type="button"
              onClick={() => handleSectionChange('products')}
              className="flex min-w-0 items-center gap-3 rounded-lg text-left"
              aria-label="Открыть справочник продуктов"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-text-inverse">
                <Store size={21} />
              </div>

              <div className={`min-w-0 ${isCollapsed ? 'lg:hidden' : ''}`}>
                <p className="truncate text-base font-semibold text-text-primary">
                  FreshMart
                </p>
                <p className="truncate text-xs text-text-muted">
                  Панель управления
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex size-9 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-muted hover:text-text-primary lg:hidden"
              aria-label="Закрыть меню"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="min-h-0 custom-scrollbar flex-1 space-y-4 overflow-y-auto overscroll-contain p-3">
            {!isCollapsed && (
              <p className="px-3 pt-2 text-xs font-medium tracking-wider text-text-muted uppercase">
                Разделы
              </p>
            )}

            {navigationGroups.map((group) => {
              const groupCollapsed = isGroupCollapsed(group.id);

              const groupHasActiveItem = group.items.some(
                (item) => item.id === activeSection,
              );

              return (
                <div key={group.id} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (isCollapsed) {
                        setIsCollapsed(false);
                        return;
                      }

                      toggleGroup(group.id);
                    }}
                    title={isCollapsed ? group.label : undefined}
                    aria-expanded={isCollapsed ? undefined : !groupCollapsed}
                    className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-xs font-semibold tracking-wide uppercase transition-colors ${
                      groupHasActiveItem
                        ? 'text-primary'
                        : 'text-text-muted hover:bg-surface-muted hover:text-text-primary'
                    } ${isCollapsed ? 'lg:justify-center lg:px-0' : 'justify-between'} `}
                  >
                    <span
                      className={`truncate ${isCollapsed ? 'lg:hidden' : ''}`}
                    >
                      {group.label}
                    </span>

                    <ChevronDown
                      size={15}
                      className={`shrink-0 transition-transform duration-200 ${groupCollapsed ? '-rotate-90' : ''} ${isCollapsed ? 'lg:hidden' : ''} `}
                    />
                  </button>

                  {!groupCollapsed && (
                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSectionChange(item.id)}
                            title={isCollapsed ? item.label : undefined}
                            aria-current={isActive ? 'page' : undefined}
                            className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                              isActive
                                ? 'bg-primary-soft text-primary'
                                : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
                            } ${isCollapsed ? 'lg:justify-center lg:px-0' : ''} `}
                          >
                            <Icon
                              size={19}
                              strokeWidth={isActive ? 2.2 : 1.8}
                              className="shrink-0"
                            />

                            <span
                              className={`min-w-0 flex-1 text-left leading-5 ${
                                isCollapsed ? 'lg:hidden' : ''
                              }`}
                            >
                              {item.label}
                            </span>

                            {isActive && (
                              <span
                                className={`size-1.5 shrink-0 rounded-full bg-primary ${
                                  isCollapsed ? 'lg:hidden' : ''
                                }`}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="shrink-0 space-y-1 border-t border-border p-3">
            <button
              type="button"
              onClick={toggleSidebar}
              title={isCollapsed ? 'Развернуть меню' : 'Свернуть меню'}
              aria-label={isCollapsed ? 'Развернуть меню' : 'Свернуть меню'}
              className={`hidden w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-text-muted transition-colors hover:bg-surface-muted hover:text-text-primary lg:flex ${isCollapsed ? 'lg:justify-center lg:px-0' : ''} `}
            >
              {isCollapsed ? (
                <PanelLeftOpen size={20} className="shrink-0" />
              ) : (
                <PanelLeftClose size={20} className="shrink-0" />
              )}

              <span className={isCollapsed ? 'lg:hidden' : ''}>
                Свернуть меню
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              title={isCollapsed ? 'К магазину' : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary ${isCollapsed ? 'lg:justify-center lg:px-0' : ''} `}
            >
              <Store size={20} className="shrink-0" />

              <span className={isCollapsed ? 'lg:hidden' : ''}>К магазину</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              title={isCollapsed ? 'Выйти' : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-danger transition-colors hover:bg-danger/10 ${isCollapsed ? 'lg:justify-center lg:px-0' : ''} `}
            >
              <LogOut size={20} className="shrink-0" />

              <span className={isCollapsed ? 'lg:hidden' : ''}>Выйти</span>
            </button>
          </div>
        </aside>

        <div
          className={`flex h-dvh min-h-0 min-w-0 flex-col overflow-hidden transition-[margin] duration-200 ${isCollapsed ? 'lg:ml-19' : 'lg:ml-67.5'} `}
        >
          <header className="sticky top-0 z-30 flex h-19 items-center justify-between border-b border-border bg-surface/95 px-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex size-10 shrink-0 items-center justify-center rounded-xl text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary lg:hidden"
                aria-label="Открыть меню"
              >
                <Menu size={22} />
              </button>

              <div className="min-w-0">
                <h1 className="truncate text-lg font-semibold text-text-primary sm:text-xl">
                  {pageTitle}
                </h1>

                <p className="hidden text-sm text-text-muted sm:block">
                  Управление интернет-магазином
                </p>
              </div>
            </div>

            <div className="ml-3 flex shrink-0 items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-text-primary">
                  Администратор
                </p>
                <p className="text-xs text-text-muted">Панель управления</p>
              </div>

              <div className="flex size-10 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
                А
              </div>
            </div>
          </header>
          <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </NotificationLayout>
  );
}

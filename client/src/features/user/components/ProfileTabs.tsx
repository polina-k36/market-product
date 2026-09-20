import { Package, SettingsIcon } from 'lucide-react';
import { useProfileMode } from '../hooks/use-profile-mode';

const ProfileTabs = () => {
  const { mode, setMode } = useProfileMode();
  return (
    <div className="border-b border-border bg-surface">
      <div>
        <div className="flex gap-8">
          <button
            onClick={() => setMode('orders')}
            className={`cursor-pointer border-b-2 py-4 transition-colors ${
              mode === 'orders'
                ? 'border-primary font-semibold text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Мои заказы
              {/* {activeOrders.length > 0 && (
                <span className="bg-primary-500 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">
                  {activeOrders.length}
                </span>
              )} */}
            </div>
          </button>
          <button
            onClick={() => setMode('settings')}
            className={`cursor-pointer border-b-2 py-4 transition-colors ${
              mode === 'settings'
                ? 'border-primary font-semibold text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            <div className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              Настройки
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;

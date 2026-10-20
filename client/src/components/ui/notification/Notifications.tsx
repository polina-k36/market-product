import { useNotificationStore } from '@/stores/notification/notification.store';
import Notification from './Notification';

export function Notifications() {
  const notifications = useNotificationStore((state) => state.notifications);
  const removeNotification = useNotificationStore(
    (state) => state.removeNotification,
  );

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col items-center">
      {notifications.map((notification) => (
        <div key={notification.id} className="pointer-events-auto w-full">
          <Notification
            type={notification.type}
            title={notification.title}
            description={notification.description}
            action={notification.action}
            onClose={() => removeNotification(notification.id)}
            className="animate-in fade-in slide-in-from-top-2"
          />
        </div>
      ))}
    </div>
  );
}

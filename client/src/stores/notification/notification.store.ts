import { create } from 'zustand';
import type {
  ICreateNotification,
  INotification,
  INotificationStore,
} from './notification.types';

export const useNotificationStore = create<INotificationStore>((set) => {
  const timers = new Map<string, ReturnType<typeof setTimeout>>();
  let nextId = 1;

  const generateId = () => `n${nextId++}`;

  const clearNotificationTimer = (id: string) => {
    const timer = timers.get(id);

    if (timer !== undefined) {
      clearTimeout(timer);
      timers.delete(id);
    }
  };

  const removeNotification = (id: string) => {
    clearNotificationTimer(id);

    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id,
      ),
    }));
  };

  const scheduleRemoval = (id: string, duration: number) => {
    if (duration <= 0) return;

    const timer = setTimeout(() => {
      removeNotification(id);
    }, duration);

    timers.set(id, timer);
  };

  const addNotification = (notification: ICreateNotification) => {
    const id = generateId();

    const newNotification: INotification = {
      ...notification,
      id,
      action: {
        label: notification.action?.label ?? 'Закрыть',
        onClick: () => {
          notification.action?.onClick?.();
          removeNotification(id);
        },
      },
    };

    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    scheduleRemoval(id, notification.duration);

    return id;
  };

  return {
    notifications: [],
    addNotification,
    removeNotification,
  };
});

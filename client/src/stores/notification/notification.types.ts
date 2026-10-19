import type { ReactNode } from 'react';

export interface INotification {
  id: string;
  type: NotificationType;
  title: string;
  description?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration: number;
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface INotificationStore {
  notifications: INotification[];
  removeNotification(id: string): void;
  addNotification(notification: ICreateNotification): void;
}

export interface ICreateNotification {
  type: NotificationType;
  title: string;
  description?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration: number;
}

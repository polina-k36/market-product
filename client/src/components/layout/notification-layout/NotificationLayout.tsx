import { Notifications } from '@/components/ui/notification/Notifications';
import type { ReactNode } from 'react';

interface INotificationLayoutProps {
  children: ReactNode;
}

const NotificationLayout = ({ children }: INotificationLayoutProps) => {
  return (
    <div>
      <Notifications />
      {children}
    </div>
  );
};

export default NotificationLayout;

import { Notifications } from '@/components/ui/notification/Notifications';
import type { ReactNode } from 'react';

interface INotificationLayoutProps {
  children: ReactNode;
  className?: string;
}

const NotificationLayout = ({
  children,
  className,
}: INotificationLayoutProps) => {
  return (
    <div className={className}>
      <Notifications />
      {children}
    </div>
  );
};

export default NotificationLayout;

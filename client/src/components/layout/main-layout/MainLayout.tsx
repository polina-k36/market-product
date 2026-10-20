import type { ReactNode } from 'react';
import Header from '../header/Header';
import ActiveOrderHeader from '@/features/orders/components/ActiveOrderHeader';
import NotConfirmOrderHeader from '@/features/orders/components/NotConfirmOrderHeader';
import NotificationLayout from '../notification-layout/NotificationLayout';

interface IMainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <NotificationLayout>
      <Header />
      <ActiveOrderHeader />
      <NotConfirmOrderHeader />

      <main className="p-4 md:p-8">{children}</main>
    </NotificationLayout>
  );
};

export default MainLayout;

import type { ReactNode } from 'react';
import Header from '../header/Header';
import ActiveOrderHeader from '@/features/orders/components/ActiveOrderHeader';
import NotConfirmOrderHeader from '@/features/orders/components/NotConfirmOrderHeader';
import { Notifications } from '@/components/ui/notification/Notifications';

interface IMainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <>
      <Header />
      <ActiveOrderHeader />
      <NotConfirmOrderHeader />
      <Notifications />

      <main className="p-4 md:p-8">{children}</main>
    </>
  );
};

export default MainLayout;

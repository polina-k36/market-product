import type { ReactNode } from 'react';
import Header from '../header/Header';
import ActiveOrderHeader from '@/features/orders/components/pages/ActiveOrderHeader';

interface IMainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <>
      <Header />
      <ActiveOrderHeader activeOrders={[{ id: 12, status: 'SHIPPED' }]} />

      <main className="p-4 md:p-8">{children}</main>
    </>
  );
};

export default MainLayout;

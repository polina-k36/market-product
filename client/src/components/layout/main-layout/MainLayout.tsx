import type { ReactNode } from 'react';
import Header from '../header/Header';

interface IMainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <>
      <Header />

      <main className="p-4 md:p-8">{children}</main>
    </>
  );
};

export default MainLayout;

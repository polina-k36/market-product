import type { ReactNode } from 'react';
interface IOrderLayoutProps {
  children: ReactNode;
  aside: ReactNode;
  header: ReactNode;
}
const OrderLayout = ({ children, header, aside }: IOrderLayoutProps) => {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      {header}
      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0 space-y-5"> {children} </div>{' '}
        <aside className="lg:sticky lg:top-6 lg:self-start">{aside}</aside>
      </div>
    </main>
  );
};
export default OrderLayout;

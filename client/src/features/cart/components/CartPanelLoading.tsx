import { ShoppingBag } from 'lucide-react';

const CartPanelLoading = () => {
  return (
    <div
      role="status"
      aria-label="Загрузка корзины"
      className="flex h-full flex-col px-6"
    >
      <div className="flex flex-col items-center pt-10">
        <div className="mb-4 flex h-20 w-20 animate-pulse items-center justify-center rounded-full bg-surface-muted">
          <ShoppingBag className="h-10 w-10 text-neutral-300" />
        </div>

        <div className="mb-2 h-6 w-40 animate-pulse rounded-lg bg-surface-muted" />
        <div className="h-4 w-52 max-w-full animate-pulse rounded-lg bg-surface-muted" />
      </div>

      <div className="mt-8 space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex gap-4">
            <div className="h-20 w-20 shrink-0 animate-pulse rounded-xl bg-surface-muted" />

            <div className="flex flex-1 flex-col justify-center gap-3">
              <div className="h-4 w-3/4 animate-pulse rounded bg-surface-muted" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-surface-muted" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-surface-muted" />
            </div>
          </div>
        ))}
      </div>

      <span className="sr-only">Загружаем товары в корзине...</span>
    </div>
  );
};

export default CartPanelLoading;

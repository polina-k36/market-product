import { ArrowLeft, Check, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router';

const CheckoutLoading = () => {
  const navigate = useNavigate();
  return (
    <main className="flex min-h-[80vh] flex-col bg-background px-4 py-6 sm:px-8 sm:py-8">
      <div className="relative flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-primary disabled:cursor-default disabled:opacity-0"
        >
          <ArrowLeft className="h-5 w-5" />
          Назад
        </button>
      </div>

      <section className="flex flex-1 flex-col items-center justify-center py-16 text-center">
        <div className="relative mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-primary/5 sm:h-48 sm:w-48">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-lg shadow-primary/10 sm:h-28 sm:w-28">
            <ShoppingCart className="h-12 w-12 text-primary sm:h-14 sm:w-14" />
            <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-md">
              <Check className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div
          className="mb-5 h-10 w-10 animate-spin rounded-full border-4 border-primary/15 border-t-primary"
          aria-hidden="true"
        />

        <h1 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
          Загрузка...
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-6 text-text-secondary sm:text-base">
          Пожалуйста, подождите, мы подготавливаем страницу оформления заказа.
        </p>
        <div className="mt-8 flex items-center gap-2.5" aria-hidden="true">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="size-2 animate-bounce rounded-full bg-primary shadow-sm shadow-primary/30"
              style={{ animationDelay: `${dot * 150}ms` }}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default CheckoutLoading;

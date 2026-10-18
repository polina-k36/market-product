import Button from '@/components/ui/buttons/Button';
import { RefreshCw, ShoppingCart, House, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

const ReservationError = () => {
  const navigate = useNavigate();
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fffafa] px-4 py-10">
      <div className="w-full max-w-3xl text-center">
        <div className="mx-auto mb-8 flex size-32 items-center justify-center rounded-full bg-danger/10 sm:size-40">
          <div className="relative flex size-24 items-center justify-center rounded-full bg-danger/10 sm:size-28">
            <ShoppingCart
              className="size-14 text-danger sm:size-16"
              strokeWidth={1.5}
            />

            <span className="absolute -top-2 -right-2 flex size-10 items-center justify-center rounded-full border-4 border-[#fffafa] bg-danger text-white">
              <span className="text-2xl leading-none">
                <X />
              </span>
            </span>
          </div>
        </div>

        <h1 className="text-2xl leading-tight font-bold text-text-primary sm:text-4xl">
          Продукты не были зарезервированы
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
          Попробуй снова оформить заказ. Возможно, товары временно недоступны
          или их количество изменилось.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Button
            variant="danger-filled"
            onClick={handleRefresh}
            className="group"
          >
            <RefreshCw className="size-5 transition-transform duration-300 group-hover:rotate-180" />
            Обновить страницу
          </Button>

          <Button
            variant="danger-white"
            onClick={() => navigate('/profile?mode=orders')}
          >
            <ShoppingCart className="size-5" />
            Перейти к заказам
          </Button>

          <Button variant="danger-white" onClick={() => navigate('/')}>
            <House className="size-5" />
            На главную
          </Button>
        </div>

        <Button
          variant="danger-white"
          onClick={() => navigate('/')}
          className="group mt-7 inline-flex w-full sm:w-fit"
        >
          <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Вернуться в корзину
        </Button>
      </div>
    </main>
  );
};

export default ReservationError;

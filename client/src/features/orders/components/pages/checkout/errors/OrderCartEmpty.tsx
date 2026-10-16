import Button from '@/components/ui/buttons/Button';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router';

const OrderCartEmpty = () => {
  const navigate = useNavigate();
  return (
    <section className="m-auto flex flex-col items-center justify-center px-5 py-12 text-center sm:px-10">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 sm:h-28 sm:w-28">
        <ShoppingCart className="h-12 w-12 text-primary sm:h-14 sm:w-14" />
      </div>

      <h2 className="max-w-lg text-xl leading-snug font-bold text-text-primary sm:text-2xl">
        Ваша корзина пока пуста
      </h2>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-text-muted sm:text-base">
        Чтобы перейти к оформлению заказа, добавьте товары в корзину.
      </p>
      <Button
        variant="primary"
        className="group mt-3.5"
        onClick={() => navigate('/')}
      >
        Перейти в каталог
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
      </Button>
    </section>
  );
};

export default OrderCartEmpty;

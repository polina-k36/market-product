import { ArrowRight, Star, Truck } from 'lucide-react';
import BgHome from '@/assets/imgs/img-bg-home.jpg';
import Button from '@/components/ui/buttons/Button';

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-primary px-5 py-8 text-text-inverse sm:px-8 sm:py-10 md:rounded-3xl md:px-12 md:py-14 lg:px-16 lg:py-16">
      <img
        src={BgHome}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover opacity-25"
      />

      <div className="absolute inset-0 bg-primary/50" />

      <div className="relative max-w-2xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-surface/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
          <span className="size-2 rounded-full bg-accent" />
          Акция недели
        </div>

        <h1 className="max-w-xl text-3xl leading-tight font-extrabold sm:text-4xl md:text-5xl lg:text-6xl">
          Скидки до 50% на свежие фрукты и овощи
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-6 text-text-inverse/85 sm:mt-5 sm:text-base sm:leading-7">
          Натуральные продукты от фермеров. Доставка в день заказа!
        </p>

        <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-center">
          <a href="#product-grid">
            <Button variant="transparent" className="w-fit">
              <span className="text-primary">Смотреть товары</span>
              <ArrowRight className="size-5 text-primary" />
            </Button>
          </a>

          <div className="flex items-center gap-2 text-sm">
            <Truck className="size-5 shrink-0" />

            <span>Бесплатно от 1000 ₽</span>
          </div>

          <div className="flex items-center gap-1.5 text-sm font-semibold">
            <Star className="size-4 fill-warning text-warning" />
            <span>4.9</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;

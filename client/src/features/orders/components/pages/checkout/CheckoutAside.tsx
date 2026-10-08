import Button from '@/components/ui/buttons/Button';
import { ArrowRight, CheckCircle2, ShoppingBag, Truck } from 'lucide-react';

interface ICheckoutAsideProps {
  productsCount: number;
  totalProducts: number;
}

const CheckoutAside = ({
  productsCount,
  totalProducts,
}: ICheckoutAsideProps) => {
  //TODO: исправить окончания у позиций
  return (
    <aside className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5 lg:sticky lg:top-6">
      <h2 className="text-base font-bold text-text-primary">Детали заказа</h2>

      <div className="mt-5 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5 text-sm text-text-secondary">
            <ShoppingBag className="size-4 shrink-0 text-text-muted" />

            <span>Товары</span>
          </div>

          <div className="text-right">
            <p className="text-sm font-medium text-text-primary">
              {Number(totalProducts.toFixed(2)).toLocaleString('ru-RU')} ₽
            </p>

            <p className="mt-0.5 text-xs text-text-muted">
              {productsCount} позиций
            </p>
          </div>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5 text-sm text-text-secondary">
            <Truck className="size-4 shrink-0 text-text-muted" />

            <span>Доставка</span>
          </div>

          <span className="text-sm font-medium text-text-primary">0 ₽</span>
        </div>
      </div>

      <div className="my-5 border-t border-border" />

      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-text-muted">Итого к оплате</p>

          <p className="mt-1 text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
            {Number(totalProducts.toFixed(2)).toLocaleString('ru-RU')} ₽
          </p>
        </div>
      </div>

      <Button variant="primary" type="button" className="group mt-5 w-full">
        Оформить заказ
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Button>

      <div className="mt-3 flex items-start gap-2 text-xs leading-5 text-text-muted">
        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
        <p className="text-xs leading-5 text-text-muted">
          Нажимая «Оформить заказ», вы соглашаетесь с{' '}
          <a
            href="#"
            className="font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:text-primary/80 hover:decoration-primary/60"
          >
            условиями
          </a>{' '}
          оформления заказа.
        </p>
      </div>
    </aside>
  );
};

export default CheckoutAside;

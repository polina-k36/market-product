import {
  Tag,
  PackageCheck,
  ShoppingCartPlus,
  ShoppingCart,
  Trash,
} from 'lucide-react';
import NavButton from '@/components/ui/buttons/NavButton';
import { useNavigate } from 'react-router';
import { useCartItemOperations } from '@/features/cart/hooks/use-cart-item-operations';
import CartItemQuantityControl from '@/features/cart/components/CartItemQuantityControl';
import { env } from '@/config/env';

interface IProductDetailsProps {
  product: {
    id: number;
    title: string;
    composition: string;
    description: string;
    imageKey: string;
    price: string;
    category: string;
    unit: {
      fullTitle: string;
      shortTitle: string;
    };
    cartQuantity: number;
  };
}

const ProductDetails = ({ product }: IProductDetailsProps) => {
  const { add, increment, decrement, remove, setQuantity } =
    useCartItemOperations(product.id, product.cartQuantity);

  const navigate = useNavigate();
  const ingredients = product.composition.split(',');

  return (
    <div className="relative mx-auto h-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-2 md:items-start lg:gap-30">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-muted p-4 shadow-sm min-[400px]:m-auto min-[400px]:w-3/4 sm:p-6 md:m-0 md:w-full lg:sticky">
          <NavButton onNavigate={() => navigate(-1)}>Вернуться</NavButton>

          <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-surface">
            <img
              src={`${env.s3Url}/${product.imageKey}`}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-500 ease-in hover:scale-[1.1]"
            />
            <div className="absolute top-3 left-3 z-15 rounded-full bg-surface/95 px-3 py-1.5 text-sm font-semibold text-primary shadow-sm backdrop-blur-md sm:text-[0.9375rem]">
              {product.category}
            </div>
          </div>
        </div>

        <div className="pt-1 lg:pt-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-sm font-semibold text-primary">
            <Tag className="size-4" />
            {product.category}
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
            {product.title}
          </h1>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl leading-none font-extrabold tracking-tight text-primary sm:text-5xl">
              {product.price} ₽
            </span>

            <span className="text-lg font-medium text-text-secondary">
              / за {product.unit.shortTitle}
            </span>
          </div>

          {product.cartQuantity === 0 ? (
            <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <PackageCheck className="size-5" />
                </div>
                <p className="text-sm font-semibold text-text-primary">
                  Доступен к заказу
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  add();
                }}
                className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-primary text-text-inverse shadow-sm transition-all duration-200 hover:bg-primary-hover hover:shadow-md focus:ring-2 focus:ring-primary/40 focus:outline-none"
              >
                <ShoppingCartPlus className="size-5" />
              </button>
            </div>
          ) : (
            <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary-soft/30 p-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-text-inverse shadow-sm">
                  <ShoppingCart className="size-5" />
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-text-primary">
                    В корзине
                  </span>

                  <span className="text-xs text-text-secondary">
                    {product.cartQuantity} {product.unit.shortTitle}.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CartItemQuantityControl
                  unit={product.unit.shortTitle}
                  quantity={product.cartQuantity}
                  onDecrement={decrement}
                  onIncrement={increment}
                  onSetQuantity={setQuantity}
                />
                <button
                  type="button"
                  onClick={() => {
                    remove();
                  }}
                  className="cursor-pointers flex size-10 items-center justify-center rounded-xl text-text-muted transition-all duration-200 hover:bg-danger/10 hover:text-danger focus:ring-2 focus:ring-danger/30 focus:outline-none"
                >
                  <Trash className="size-4.5" />
                </button>
              </div>
            </div>
          )}

          <section className="mt-6">
            <h2 className="text-xl font-bold text-text-primary">Описание</h2>

            <div className="mt-3 rounded-2xl border border-border bg-surface-muted p-5">
              <p className="leading-7 text-text-secondary">
                {product.description}
              </p>
            </div>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-bold text-text-primary">Состав</h2>

            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {ingredients.map((ingredient, index) => (
                <li
                  key={ingredient}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 transition-colors duration-200 hover:border-primary/30 hover:bg-primary-soft/40"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-sm font-bold text-primary">
                    {index + 1}
                  </span>

                  <span className="font-medium text-text-primary">
                    {ingredient.trim().charAt(0).toUpperCase() +
                      ingredient.trim().slice(1)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

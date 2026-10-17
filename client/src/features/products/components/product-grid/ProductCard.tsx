import CartItemQuantityControl from '@/features/cart/components/CartItemQuantityControl';
import { useCartItemOperations } from '@/features/cart/hooks/use-cart-item-operations';
import { Plus, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';
import { env } from '@/config/env';

interface IProductCardProps {
  id: number;
  title: string;
  imgUrl: string;
  price: string;
  unit: string;
  category: string;
  cartQuantity: number;
}

const ProductCard = ({
  id,
  title,
  imgUrl,
  price,
  unit,
  category,
  cartQuantity,
}: IProductCardProps) => {
  const { add, increment, decrement, setQuantity } = useCartItemOperations(
    id,
    cartQuantity,
  );

  return (
    <Link
      to={`/products/${id}`}
      className="block overflow-hidden rounded-2xl bg-surface shadow-2xs transition-all duration-200 ease-in hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-surface">
        <img
          src={`${env.s3Url}/${imgUrl}`}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 ease-in hover:scale-[1.1]"
        />
        {/* <Image className="size-1/3 text-primary transition-transform duration-500 ease-in hover:scale-[1.1]" /> */}
        <div className="absolute top-3 left-3 rounded-full bg-surface/95 px-3 py-1.5 text-sm font-semibold text-primary shadow-sm backdrop-blur-md sm:text-[0.9375rem]">
          {category}
        </div>
      </div>
      <div className="p-5">
        <h3 className="mb-2 text-xl font-semibold text-text-primary">
          {title}
        </h3>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl leading-none font-extrabold tracking-tight text-primary md:font-bold">
                {price} ₽
              </span>

              <span className="text-sm font-medium whitespace-nowrap text-text-secondary">
                / за {unit}
              </span>
            </div>
          </div>
          {!cartQuantity && cartQuantity === 0 ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                add();
              }}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-none bg-surface-muted p-2 text-primary transition-all duration-200 ease-in hover:bg-primary-hover hover:text-text-inverse"
            >
              <ShoppingCart />
              <Plus />
            </button>
          ) : (
            <CartItemQuantityControl
              quantity={cartQuantity}
              onIncrement={increment}
              onDecrement={decrement}
              onSetQuantity={setQuantity}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

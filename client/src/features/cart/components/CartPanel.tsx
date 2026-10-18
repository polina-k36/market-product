import { useAuthStore } from '@/stores/auth/auth.store';
import { useCartItems } from '../hooks/use-cart-items';
import CartFooter from './CartFooter';
import CartHeader from './CartHeader';
import CartPanelAuthError from './CartPanelAuthError';
import CartPanelEmpty from './CartPanelEmpty';
import CartPanelLoading from './CartPanelLoading';
import CartProductCard from './CartProductCard';
import { usePrepareCheckoutFromCart } from '@/features/reservations/hooks/use-prepare-checkout-from-cart';
import { useCartStore } from '../store/cart.store';

const CartPanel = () => {
  const { data: products, isError, error, isLoading } = useCartItems(); //TODO: подумать над ошибками при загрузке корзины
  const { checkout } = usePrepareCheckoutFromCart();
  const status = useAuthStore((state) => state.status);
  //TODO: ОБДУМАТЬ ДОСТАВКУ цену и хранение ее цены

  const totalItems = products ? products.length : 0;
  const closeCart = useCartStore((state) => state.closeCart);

  const totalPrice = products
    ? products.reduce(
        (sum, product) => sum + product.price * Number(product.quantity),
        0,
      )
    : 0;

  const handleCheckout = () => {
    checkout();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 h-screen w-full cursor-pointer bg-black/40 backdrop-blur-[1px]"
        aria-hidden="true"
        onClick={closeCart}
      />

      <aside className="fixed top-0 right-0 z-50 flex h-dvh w-full max-w-md flex-col bg-surface shadow-2xl">
        <CartHeader totalItems={totalItems} />
        {isLoading ? (
          <CartPanelLoading />
        ) : status === 'unauthenticated' ? (
          <CartPanelAuthError />
        ) : products === undefined || products.length === 0 ? (
          <CartPanelEmpty />
        ) : (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-3">
                {products.map((product) => (
                  <CartProductCard
                    key={product.id}
                    product={{
                      ...product,
                      price: +product.price,
                      quantity: Number(product.quantity),
                    }}
                    mode={{ name: 'cart' }}
                  />
                ))}
              </div>
            </div>

            <CartFooter totalPrice={totalPrice} onCheckout={handleCheckout} />
          </>
        )}
      </aside>
    </>
  );
};

export default CartPanel;

import { useNavigate } from 'react-router';
import { useCartItems } from '../hooks/use-cart-items';
import CartFooter from './CartFooter';
import CartHeader from './CartHeader';
import CartPanelEmpty from './CartPanelEmpty';
import CartProductCard from './CartProductCard';

const CartPanel = () => {
  const { data: products } = useCartItems();
  const navigate = useNavigate();
  //TODO: ОБДУМАТЬ ДОСТАВКУ цену и хранение ее цены

  const totalItems = products ? products.length : 0;

  const totalPrice = products
    ? products.reduce(
        (sum, product) => sum + product.price * Number(product.quantity),
        0,
      )
    : 0;

  const handleCheckout = () => {
    navigate('/orders/checkout');
    document.body.style.overflowY = 'scroll';
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]"
        aria-hidden="true"
      />

      <aside className="fixed top-0 right-0 z-50 flex h-dvh w-full max-w-md flex-col bg-surface shadow-2xl">
        <CartHeader totalItems={totalItems} />
        {products === undefined || products.length === 0 ? (
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
                      imageUrl: product.imageKey,
                      price: +product.price,
                    }}
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

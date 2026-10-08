import OrderLayout from '@/components/layout/order/OrderLayout';
import CartProductCard from '@/features/cart/components/CartProductCard';
import { useCartItems } from '@/features/cart/hooks/use-cart-items';
import CheckoutAside from '@/features/orders/components/pages/checkout/CheckoutAside';
import CheckoutHeader from '@/features/orders/components/pages/checkout/CheckoutHeader';
import DeliveryForm from '@/features/orders/components/pages/checkout/DeliveryForm';
import PaymentForm from '@/features/orders/components/pages/checkout/PaymentForm';
import type {
  DeliveryMethod,
  PaymentMethod,
} from '@/features/orders/types/order.types';
import { ShoppingBag } from 'lucide-react';
import { useMemo, useState } from 'react';

const OrderCheckoutPage = () => {
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const changeDeliveryMethod = (method: DeliveryMethod) => {
    setDeliveryMethod(method);
  };
  const changePaymentMethod = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };
  const { data: products } = useCartItems();
  const total = useMemo(() => {
    let totalPrice = 0;
    if (products && products.length > 0) {
      products.forEach((product) => {
        totalPrice += Number(product.price) * Number(product.quantity);
      });
    }
    return totalPrice;
  }, [products]);
  return (
    <OrderLayout
      aside={
        <CheckoutAside
          productsCount={products ? products.length : 0}
          totalProducts={total}
        />
      }
      header={<CheckoutHeader />}
    >
      {products && (
        <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              1
            </span>
            <ShoppingBag className="h-5 w-5 text-primary" />

            <div>
              <h2 className="text-[1.1rem] font-bold text-text-primary">
                Товары
              </h2>

              <p className="text-xs text-text-muted">
                {products.length} позиций
              </p>
            </div>
          </div>

          <div className="max-h-72 scrollbar-gutter-stable overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-text-muted/40 hover:[&::-webkit-scrollbar-thumb]:bg-text-muted/60 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-border/30">
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
        </section>
      )}
      <DeliveryForm
        deliveryMethod={deliveryMethod}
        onDeliveryMethodChange={changeDeliveryMethod}
      />
      <PaymentForm
        paymentMethod={paymentMethod}
        onPaymentMethodChange={changePaymentMethod}
      />
    </OrderLayout>
  );
};

export default OrderCheckoutPage;

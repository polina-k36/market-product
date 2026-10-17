import OrderLayout from '@/components/layout/order/OrderLayout';
import CartProductCard from '@/features/cart/components/CartProductCard';
import CheckoutAside from '@/features/orders/components/pages/checkout/CheckoutAside';
import CheckoutHeader from '@/features/orders/components/pages/checkout/CheckoutHeader';
import DeliveryForm from '@/features/orders/components/pages/checkout/DeliveryForm';
import PaymentForm from '@/features/orders/components/pages/checkout/PaymentForm';
import { ShoppingBag } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import ReservationNotifications from '@/features/reservations/components/notifications/ReservationNotifications';
import { useReservation } from '@/features/reservations/hooks/use-reservation';
import type { IReservationItem } from '@/features/reservations/types/reservation.types';
import { useNavigate } from 'react-router';
import ReservationError from '@/features/reservations/components/errors/ReservationError';
import { useDeliverySelection } from '@/features/orders/hooks/use-delivery-selection';
import { usePaymentSelection } from '@/features/orders/hooks/use-payment-selection';
import { useCreateOrder } from '@/features/orders/hooks/use-create-order';
import type { ICreateOrder } from '@/features/orders/types/order.types';
import OrderCartEmpty from './errors/OrderCartEmpty';
import CheckoutLoading from './CheckoutLoading';
import { useCancelReservation } from '@/features/reservations/hooks/use-cancel-reservation';

interface IOrderCheckoutProps {
  reservationId: number;
  notificationItems?: IReservationItem[];
  isNewReservation: boolean;
}
//TODO показывать окно о пустом списке продуктов если такое произойдет
//TODO сделать нормальное время резервирования - чтобы пока пользователь был на странице и что то делала он не заканчивался может но при выходе со странице мы устанавливаем 15 минут чтобы пользователь могу вернуться к заказу

const OrderCheckout = ({
  reservationId,
  notificationItems,
  isNewReservation,
}: IOrderCheckoutProps) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(true);

  const [paymentErrors, setPaymentErrors] = useState<{
    success: boolean;
    data: null;
    error: string;
  } | null>(null);

  const [deliveryErrors, setDeliveryErrors] = useState<{
    success: boolean;
    data: null;
    error: string;
  } | null>(null);

  const {
    selectedCardId,
    isLoadingCards,
    setSelectedCardId,
    getPaymentValues,
  } = usePaymentSelection();

  const {
    selectedAddressId,
    isLoadingAddresses,
    setSelectedAddressId,
    getDeliveryValues,
  } = useDeliverySelection();

  const { mutate: createOrder } = useCreateOrder();
  const { mutate: cancelReservation } = useCancelReservation();

  const {
    data: reservation,
    isError,
    isPending,
  } = useReservation(reservationId);

  const availableProducts = useMemo(
    () =>
      reservation?.items &&
      reservation?.items
        .map((item) => ({
          productId: item.product.id,
          title: item.product.title,
          description: item.product.description,
          unit: item.product.unit,
          imageUrl: item.product.imageKey,
          price: Number(item.product.price),
          quantity: Number(item.quantity),
        }))
        .filter((product) => product !== undefined),
    [reservation],
  );
  const total = useMemo(
    () =>
      availableProducts?.reduce(
        (sum, product) =>
          sum + Number(product.price) * Number(product.quantity),
        0,
      ) ?? 0,
    [availableProducts],
  );
  const reservedStatuses = useMemo(
    () => notificationItems?.map((item) => item.status),
    [notificationItems],
  );

  useEffect(() => {
    if ((reservation && reservation.expiresAt < new Date()) || isError) {
      console.log('reservation expired');
      // navigate(`/`);
    }
  }, [reservation, navigate, isError]);

  const confirmOrder = () => {
    const deliveryInfo = getDeliveryValues();
    const paymentInfo = getPaymentValues();

    if (!deliveryInfo || !paymentInfo) {
      return;
    }

    if (paymentInfo.success === false) {
      setPaymentErrors({
        success: false,
        data: null,
        error: paymentInfo.error ?? 'Неизвестная ошибка',
      });
    }

    if (paymentInfo.success === false) {
      setPaymentErrors({
        success: false,
        data: null,
        error: paymentInfo.error ?? 'Неизвестная ошибка',
      });
    } else {
      setPaymentErrors(null);
    }
    if (deliveryInfo.success === false) {
      setDeliveryErrors({
        success: false,
        data: null,
        error: deliveryInfo.error ?? 'Неизвестная ошибка',
      });
    } else {
      setDeliveryErrors(null);
    }
    if (
      deliveryInfo.data === null ||
      paymentInfo.data === null ||
      !reservation
    ) {
      return;
    }

    const data: ICreateOrder = {
      ...deliveryInfo.data,
      ...paymentInfo.data,
      reservationId: reservation.reservationId,
    };

    createOrder(data, {
      onSuccess: (data) => {
        navigate(`/orders/${data.id}/success`);
      },
    });
  };

  return (
    <>
      {isPending ? (
        <CheckoutLoading />
      ) : (
        <>
          {isError || !reservation || reservation.reservationId === null ? (
            <ReservationError />
          ) : !availableProducts || availableProducts.length === 0 ? (
            <div className="flex min-h-screen items-center justify-center">
              <OrderCartEmpty />
            </div>
          ) : (
            <>
              {showNotifications &&
                notificationItems &&
                notificationItems.length > 0 &&
                reservedStatuses &&
                (reservedStatuses.includes('PARTIALLY_RESERVED') ||
                  reservedStatuses.includes('UNAVAILABLE')) && (
                  <ReservationNotifications
                    kind={
                      reservedStatuses.includes('PARTIALLY_RESERVED')
                        ? 'partially-reserved'
                        : 'not-reserved'
                    }
                    products={notificationItems
                      .filter(
                        (item) =>
                          item.status === 'PARTIALLY_RESERVED' ||
                          item.status === 'UNAVAILABLE',
                      )
                      .map((item) => {
                        return {
                          productId: item.product?.id ?? 0,
                          product: item.product?.title ?? '',
                          status: item.status,
                          reservedQuantity: item.reservedQuantity,
                          requestedQuantity: item.requestedQuantity,
                        };
                      })}
                    onAction={() => {
                      cancelReservation(reservationId, {
                        onSuccess: () => {
                          navigate(`/`);
                        },
                      });
                    }}
                    onClose={() => {
                      setShowNotifications(false);
                    }}
                  />
                )}
              <OrderLayout
                aside={
                  <CheckoutAside
                    reservationId={reservation.reservationId}
                    productsCount={
                      availableProducts ? availableProducts.length : 0
                    }
                    totalProducts={total}
                    disabledConfirmOrder={isLoadingAddresses || isLoadingCards}
                    onConfirmOrder={confirmOrder}
                  />
                }
                header={<CheckoutHeader isNewReservation={isNewReservation} />}
              >
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
                        {availableProducts.length}{' '}
                        {availableProducts.length === 1
                          ? 'позиция'
                          : availableProducts.length < 5
                            ? 'позиции'
                            : 'позиций'}
                      </p>
                    </div>
                  </div>

                  <div className="max-h-72 scrollbar-gutter-stable overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-text-muted/40 hover:[&::-webkit-scrollbar-thumb]:bg-text-muted/60 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-border/30">
                    <div className="space-y-3">
                      {availableProducts.map(
                        (product) =>
                          reservation.reservationId !== null && (
                            <CartProductCard
                              key={product.productId}
                              product={{
                                ...product,
                                price: Number(product.price),
                              }}
                              mode={{
                                name: 'order',
                                reservationId: reservation.reservationId,
                              }}
                            />
                          ),
                      )}
                    </div>
                  </div>
                </section>
                <DeliveryForm
                  reservationId={reservation.reservationId}
                  selectedAddressId={selectedAddressId}
                  setSelectedAddressId={setSelectedAddressId}
                  resetValid={() => setDeliveryErrors(null)}
                  isNotValid={deliveryErrors !== null}
                />
                <PaymentForm
                  selectedCardId={selectedCardId}
                  setSelectedCardId={setSelectedCardId}
                  resetValid={() => setPaymentErrors(null)}
                  isNotValid={paymentErrors !== null}
                />
              </OrderLayout>
            </>
          )}
        </>
      )}
    </>
  );
};

export default OrderCheckout;

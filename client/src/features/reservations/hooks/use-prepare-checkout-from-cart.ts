import { useNavigate } from 'react-router';
import { useShopStore } from '@/stores/shop/shop.store';
import { useCreateReservationFromCart } from './use-create-reservation-from-cart';

export function usePrepareCheckoutFromCart() {
  const navigate = useNavigate();
  const { shopId } = useShopStore();
  const { mutate: createReservation } = useCreateReservationFromCart();

  const checkout = () => {
    createReservation(
      {
        shopId,
      },
      {
        onSuccess: (data) => {
          navigate(`/orders/checkout/${data.reservationId}`, {
            state: {
              issues: data.items.filter(
                (item) =>
                  item.status === 'UNAVAILABLE' ||
                  item.status === 'PARTIALLY_RESERVED',
              ),
            },
          });
        },
        onError: () => {
          console.log('reservation not created'); //думаю тут перенести тоже на страницу чекаут но вместе reservationID будет null или слово error чтобя я его обработала на странице
        },
      },
    );
  };

  return { checkout };
}

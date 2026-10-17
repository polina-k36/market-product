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
          //FIXME при возврате id резерва Null отправлять сразу на ошибку как нибудь пока у нас передается в id И как бы есть ошибка но лучше было бы изначально передать как исключительное состояние
          navigate(`/orders/checkout/${data.reservationId}`, {
            state: {
              issues: data.items.filter(
                (item) =>
                  item.status === 'UNAVAILABLE' ||
                  item.status === 'PARTIALLY_RESERVED',
              ),
              isNewReservation: data.isNew,
            },
          });
        },
        onError: () => {
          console.log('reservation not created'); //TODO: думаю тут перенести тоже на страницу чекаут но вместе reservationID будет null или слово error чтобя я его обработала на странице
        },
      },
    );
  };

  return { checkout };
}

import { useDecrementReservationItem } from './use-decrement-reservation-item';
import { useIncrementReservationItem } from './use-increment-reservation-item';
import { useRemoveReservationItem } from './use-remove-reservation-item';
import { useSetReservationItemQuantity } from './use-set-reservation-item-quantity';

export function useReservationItemOperations(
  reservationId: number | undefined | null,
  productId: number,
) {
  const { mutate: decrementReservationItem } = useDecrementReservationItem();
  const { mutate: incrementReservationItem } = useIncrementReservationItem();
  const { mutate: setReservationItemQuantity } =
    useSetReservationItemQuantity();
  const { mutate: removeReservationItem } = useRemoveReservationItem();

  const decrement = (quantity?: number) => {
    if (!reservationId) return;
    decrementReservationItem({
      reservationId,
      productId,
      quantity,
    });
  };
  const increment = (quantity?: number) => {
    if (!reservationId) return;
    incrementReservationItem({
      reservationId,
      productId,
      quantity,
    });
  };
  const setQuantity = (quantity: number) => {
    if (!reservationId) return;
    setReservationItemQuantity({
      reservationId,
      productId,
      quantity,
    });
  };
  const remove = () => {
    if (!reservationId) return;
    removeReservationItem({
      reservationId,
      productId,
    });
  };

  return {
    decrement,
    increment,
    setQuantity,
    remove,
  };
}

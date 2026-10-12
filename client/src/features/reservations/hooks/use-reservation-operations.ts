import { useCancelReservation } from './use-cancel-reservation';
import { useChangeShopReservation } from './use-change-shop-reservation';
import { useConfirmReservation } from './use-confirm-reservation';

export function useReservationOperations(reservationId: number) {
  const { mutate: cancelReservation } = useCancelReservation();
  const { mutate: confirmReservation } = useConfirmReservation();
  const { mutate: changeShopReservation } = useChangeShopReservation();

  const cancel = () => {
    cancelReservation(reservationId);
  };
  const confirm = () => {
    confirmReservation(reservationId);
  };
  const changeShop = (shopId: number) => {
    changeShopReservation({
      reservationId,
      shopId,
    });
  };

  return {
    cancel,
    confirm,
    changeShop,
  };
}

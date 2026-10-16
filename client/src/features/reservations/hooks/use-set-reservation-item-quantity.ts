import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reservationApi } from '../api/reservation.api';
import { RESERVATION_QUERY_KEY } from './use-reservation';

export function useSetReservationItemQuantity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...RESERVATION_QUERY_KEY, 'set-item-quantity'],
    mutationFn: reservationApi.setItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: RESERVATION_QUERY_KEY,
      });
    },
  });
}

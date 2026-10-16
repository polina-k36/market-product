import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reservationApi } from '../api/reservation.api';
import { RESERVATION_QUERY_KEY } from './use-reservation';

export function useDecrementReservationItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...RESERVATION_QUERY_KEY, 'decrement-item'],
    mutationFn: reservationApi.decrementItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: RESERVATION_QUERY_KEY,
      });
    },
  });
}

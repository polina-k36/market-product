import { useMutation } from '@tanstack/react-query';
import { reservationApi } from '../api/reservation.api';
import { RESERVATION_QUERY_KEY } from './use-reservation';

export function useRemoveReservationItem() {
  return useMutation({
    mutationKey: [...RESERVATION_QUERY_KEY, 'remove-item'],
    mutationFn: reservationApi.removeItem,
  });
}

import { useMutation } from '@tanstack/react-query';
import { reservationApi } from '../api/reservation.api';
import { RESERVATION_QUERY_KEY } from './use-reservation';

export function useConfirmReservation() {
  return useMutation({
    mutationKey: [...RESERVATION_QUERY_KEY, 'confirm'],
    mutationFn: reservationApi.confirm,
  });
}

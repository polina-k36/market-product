import { useMutation } from '@tanstack/react-query';
import { reservationApi } from '../api/reservation.api';
import { RESERVATION_QUERY_KEY } from './use-reservation';

export function useCreateReservation() {
  return useMutation({
    mutationKey: [...RESERVATION_QUERY_KEY, 'create'],
    mutationFn: reservationApi.create,
  });
}

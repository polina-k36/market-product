import { useQuery } from '@tanstack/react-query';
import { RESERVATION_QUERY_KEY } from './use-reservation';
import { reservationApi } from '../api/reservation.api';

export function useUserReservation() {
  return useQuery({
    queryKey: [...RESERVATION_QUERY_KEY, 'user'],
    queryFn: reservationApi.getByUser,
  });
}

import { useQuery } from '@tanstack/react-query';
import { reservationApi } from '../api/reservation.api';
import { useAuthStore } from '@/stores/auth/auth.store';

export const RESERVATION_QUERY_KEY = ['reservations'] as const;

export function useReservation(id: number) {
  const status = useAuthStore((state) => state.status);
  return useQuery({
    queryKey: [...RESERVATION_QUERY_KEY, id],
    queryFn: () => reservationApi.getById(id),
    enabled: status === 'authenticated',
  });
}

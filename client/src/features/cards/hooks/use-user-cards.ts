import { useAuthStore } from '@/stores/auth/auth.store';
import { useQuery } from '@tanstack/react-query';
import { cardApi } from '../api/card.api';

export const USER_CARDS_QUERY_KEY = ['user-cards'] as const;

export function useUserCards() {
  const status = useAuthStore((state) => state.status);
  return useQuery({
    queryKey: USER_CARDS_QUERY_KEY,
    queryFn: cardApi.getAllUserCards,
    enabled: status === 'authenticated',
  });
}

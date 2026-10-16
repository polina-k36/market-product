import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cardApi } from '../api/card.api';
import { USER_CARDS_QUERY_KEY } from './use-user-cards';
import type { ICreateCard } from '../types/card.types';

export function useCreteUserCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [USER_CARDS_QUERY_KEY, 'create'],
    mutationFn: async (data: ICreateCard) => {
      return await cardApi.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_CARDS_QUERY_KEY,
      });
    },
  });
}

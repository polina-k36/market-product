import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SHOPS_QUERY_KEY } from './use-shops';
import { shopApi } from '../api/shop.api';

export function useCreateShop() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...SHOPS_QUERY_KEY, 'create'],
    mutationFn: shopApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SHOPS_QUERY_KEY,
      });
    },
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SHOPS_QUERY_KEY } from './use-shops';
import { shopApi } from '../api/shop.api';

export function useRemoveShop() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...SHOPS_QUERY_KEY, 'remove'],
    mutationFn: shopApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SHOPS_QUERY_KEY,
      });
    },
  });
}

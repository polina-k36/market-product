import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SHOPS_QUERY_KEY } from './use-shops';
import { shopApi } from '../api/shop.api';
import type { IUpdateShop } from '../types/shop.types';

export function useUpdateShop(shopId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...SHOPS_QUERY_KEY, shopId, 'update'],
    mutationFn: (data: IUpdateShop) =>
      shopApi.update({
        shopId,
        updateData: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SHOPS_QUERY_KEY,
      });
    },
  });
}

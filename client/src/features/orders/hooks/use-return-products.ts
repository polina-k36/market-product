import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ORDERS_QUERY_KEY } from './use-orders';
import { ordersApi } from '../api/orders.api';

export function useReturnProducts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...ORDERS_QUERY_KEY, 'return'],
    mutationFn: ordersApi.returnOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ORDERS_QUERY_KEY,
      });
    },
  });
}

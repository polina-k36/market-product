import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '../api/orders.api';
import { ORDERS_QUERY_KEY } from './use-orders';

export function useCancelOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...ORDERS_QUERY_KEY, 'cancel'],
    mutationFn: ordersApi.cancelOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ORDERS_QUERY_KEY,
      });
    },
  });
}

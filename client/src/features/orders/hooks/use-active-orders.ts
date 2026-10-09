import { useQuery } from '@tanstack/react-query';
import { ORDERS_QUERY_KEY } from './use-orders';
import { ordersApi } from '../api/orders.api';

export function useActiveOrders() {
  return useQuery({
    queryKey: [...ORDERS_QUERY_KEY, 'active'],
    queryFn: ordersApi.getMineActiveOrders,
  });
}

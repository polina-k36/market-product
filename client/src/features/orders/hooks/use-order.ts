import { useQuery } from '@tanstack/react-query';
import { ORDERS_QUERY_KEY } from './use-orders';
import { ordersApi } from '../api/orders.api';
import { useAuthStore } from '@/stores/auth/auth.store';

export function useOrder(id: number) {
  const status = useAuthStore((state) => state.status);
  return useQuery({
    queryKey: [...ORDERS_QUERY_KEY, id],
    queryFn: () => ordersApi.getOrderById(id),
    enabled: status === 'authenticated',
  });
}

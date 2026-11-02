import { useQuery } from '@tanstack/react-query';
import { ORDERS_QUERY_KEY } from '../use-orders';
import { ordersApi } from '../../api/orders.api';
import { useAuthStore } from '@/stores/auth/auth.store';

export function useAllOrders() {
  const status = useAuthStore((state) => state.status);
  return useQuery({
    queryKey: [ORDERS_QUERY_KEY, 'all-admin'],
    queryFn: ordersApi.getAll,
    enabled: status === 'authenticated',
  });
}

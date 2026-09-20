import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '../api/orders.api';
import { useAuthStore } from '@/stores/auth/auth.store';

const ORDERS_QUERY_KEY = ['orders'] as const;
export function useOrders() {
  const { status } = useAuthStore();
  return useQuery({
    queryKey: ORDERS_QUERY_KEY,
    queryFn: ordersApi.getMineOrders,
    enabled: status === 'authenticated',
  });
}

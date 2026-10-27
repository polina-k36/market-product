import { useQuery } from '@tanstack/react-query';
import { PRODUCTS_QUERY_KEY } from './use-products';
import { productsApi } from '../api/products.api';
import { useAuthStore } from '@/stores/auth/auth.store';

export function useProduct(id: number | undefined) {
  const authStatus = useAuthStore((state) => state.status);
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, id],
    queryFn: () => productsApi.getProductById(id ?? 0),
    enabled: authStatus !== 'unknown' || id !== undefined,
  });
}

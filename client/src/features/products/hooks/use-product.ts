import { useSuspenseQuery } from '@tanstack/react-query';
import { PRODUCTS_QUERY_KEY } from './use-products';
import { productsApi } from '../api/products.api';

export function useProduct(id: number) {
  return useSuspenseQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, id],
    queryFn: () => productsApi.getProductById(id),
  });
}

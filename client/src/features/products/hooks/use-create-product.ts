import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PRODUCTS_QUERY_KEY } from './use-products';
import { productsApi } from '../api/products.api';

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...PRODUCTS_QUERY_KEY, 'create'],
    mutationFn: productsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PRODUCTS_QUERY_KEY,
      });
    },
  });
}

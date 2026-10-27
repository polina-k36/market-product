import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PRODUCTS_QUERY_KEY } from './use-products';
import { productsApi } from '../api/products.api';
import type { IUpdateProduct } from '../types/products.types';

export function useUpdateProduct(productId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...PRODUCTS_QUERY_KEY, productId, 'update'],
    mutationFn: (updatedData: IUpdateProduct) =>
      productsApi.update({ productId, updatedData }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PRODUCTS_QUERY_KEY,
      });
    },
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CART_ITEMS_QUERY_KEY } from './use-cart-items';
import { cartApi } from '../api/cart.api';
import { PRODUCTS_QUERY_KEY } from '@/features/products/hooks/use-products';

export function useSetCartItemQuantity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...CART_ITEMS_QUERY_KEY, 'set-quantity'],
    mutationFn: cartApi.setCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PRODUCTS_QUERY_KEY,
      });
      queryClient.invalidateQueries({
        queryKey: CART_ITEMS_QUERY_KEY,
      });
    },
  });
}

import { useQuery } from '@tanstack/react-query';
import { cartApi } from '../api/cart.api';

export const CART_ITEMS_QUERY_KEY = ['cart-items'] as const;

export function useCartItems() {
  return useQuery({
    queryKey: CART_ITEMS_QUERY_KEY,
    queryFn: cartApi.getCartItem,
  });
}

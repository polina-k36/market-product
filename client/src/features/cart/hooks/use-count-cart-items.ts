import { useQuery } from '@tanstack/react-query';
import { CART_ITEMS_QUERY_KEY } from './use-cart-items';
import { cartApi } from '../api/cart.api';

export function useCountCartItems() {
  return useQuery({
    queryKey: [...CART_ITEMS_QUERY_KEY, 'count'],
    queryFn: cartApi.getCountItems,
  });
}

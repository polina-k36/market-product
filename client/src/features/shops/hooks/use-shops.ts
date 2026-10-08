import { useQuery } from '@tanstack/react-query';
import { shopApi } from '../api/shop.api';

export const SHOPS_QUERY_KEY = ['shops'];

export function useShops() {
  return useQuery({
    queryKey: SHOPS_QUERY_KEY,
    queryFn: shopApi.getAll,
  });
}

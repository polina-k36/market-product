import { useQuery } from '@tanstack/react-query';
import { SHOPS_QUERY_KEY } from './use-shops';
import { shopApi } from '../api/shop.api';

export function useShop(id: number | undefined) {
  return useQuery({
    queryKey: [...SHOPS_QUERY_KEY, id],
    queryFn: () => shopApi.getById(id ?? -1),
    enabled: id !== undefined,
  });
}

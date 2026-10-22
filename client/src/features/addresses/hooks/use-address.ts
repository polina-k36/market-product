import { useQuery } from '@tanstack/react-query';
import { addressApi } from '../api/address.api';
import { ADDRESSES_QUERY_KEY } from './use-addresses';

export function useAddress(id?: number) {
  return useQuery({
    queryKey: [...ADDRESSES_QUERY_KEY, id],
    queryFn: () => addressApi.getAddressById(id ?? 0),
    enabled: id !== undefined && id !== null && id > 0,
  });
}

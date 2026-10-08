import { useMutation } from '@tanstack/react-query';
import { addressApi } from '../api/address.api';
import { ADDRESSES_QUERY_KEY } from './use-addresses';

export function useRemoveAddress() {
  return useMutation({
    mutationKey: [...ADDRESSES_QUERY_KEY, 'remove'],
    mutationFn: addressApi.removeAddress,
  });
}

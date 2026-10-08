import { useQuery } from '@tanstack/react-query';
import { addressApi } from '../api/address.api';
import { useAuthStore } from '@/stores/auth/auth.store';

export const ADDRESSES_QUERY_KEY = ['user-addresses'] as const;
export function useAddresses() {
  const status = useAuthStore((state) => state.status);
  return useQuery({
    queryKey: ADDRESSES_QUERY_KEY,
    queryFn: addressApi.getAllAddresses,
    enabled: status === 'authenticated',
  });
}

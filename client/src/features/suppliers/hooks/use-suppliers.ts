import { useQuery } from '@tanstack/react-query';
import { supplierApi } from '../api/supplier.api';
import { useAuthStore } from '@/stores/auth/auth.store';

export const SUPPLIERS_QUERY_KEY = ['suppliers'] as const;

export function useSuppliers() {
  const authStatus = useAuthStore((state) => state.status);

  return useQuery({
    queryKey: SUPPLIERS_QUERY_KEY,
    queryFn: supplierApi.getSuppliers,
    enabled: authStatus !== 'unknown',
  });
}

import { useQuery } from '@tanstack/react-query';
import { SUPPLIERS_QUERY_KEY } from './use-suppliers';
import { supplierApi } from '../api/supplier.api';
import { useAuthStore } from '@/stores/auth/auth.store';

export function useSupplier(id: number | undefined) {
  const authStatus = useAuthStore((state) => state.status);

  return useQuery({
    queryKey: [...SUPPLIERS_QUERY_KEY, id],
    queryFn: () => supplierApi.getSupplierById(id ?? 0),
    enabled: authStatus !== 'unknown' || id !== undefined,
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SUPPLIERS_QUERY_KEY } from './use-suppliers';
import { supplierApi } from '../api/supplier.api';

export function useRemoveSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...SUPPLIERS_QUERY_KEY, 'remove'],
    mutationFn: (supplierId: number) => supplierApi.remove(supplierId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SUPPLIERS_QUERY_KEY,
      });
    },
  });
}

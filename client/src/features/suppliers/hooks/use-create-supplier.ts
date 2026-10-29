import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SUPPLIERS_QUERY_KEY } from './use-suppliers';
import { supplierApi } from '../api/supplier.api';

export function useCreateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...SUPPLIERS_QUERY_KEY, 'create'],
    mutationFn: supplierApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SUPPLIERS_QUERY_KEY,
      });
    },
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SUPPLIERS_QUERY_KEY } from './use-suppliers';
import { supplierApi } from '../api/supplier.api';
import type { IUpdateSupplier } from '../types/supplier.types';

export function useUpdateSupplier(supplierId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...SUPPLIERS_QUERY_KEY, supplierId, 'update'],
    mutationFn: (updatedData: IUpdateSupplier) =>
      supplierApi.update({ supplierId, updatedData }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SUPPLIERS_QUERY_KEY,
      });
    },
  });
}

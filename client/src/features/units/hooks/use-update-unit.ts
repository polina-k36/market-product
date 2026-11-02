import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UNITS_QUERY_KEY } from './use-units';
import { unitApi } from '../api/unit.api';
import type { IUpdateUnit } from '../types/unit.types';

export function useUpdateUnit(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...UNITS_QUERY_KEY, id, 'update'],
    mutationFn: (data: IUpdateUnit) => unitApi.update({ id, updateData: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: UNITS_QUERY_KEY,
      });
    },
  });
}

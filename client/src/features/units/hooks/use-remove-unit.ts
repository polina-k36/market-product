import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UNITS_QUERY_KEY } from './use-units';
import { unitApi } from '../api/unit.api';

export function useRemoveUnit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...UNITS_QUERY_KEY, 'remove'],
    mutationFn: unitApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: UNITS_QUERY_KEY,
      });
    },
  });
}

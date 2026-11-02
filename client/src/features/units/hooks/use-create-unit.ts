import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UNITS_QUERY_KEY } from './use-units';
import { unitApi } from '../api/unit.api';

export function useCreateUnit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...UNITS_QUERY_KEY, 'create'],
    mutationFn: unitApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: UNITS_QUERY_KEY,
      });
    },
  });
}

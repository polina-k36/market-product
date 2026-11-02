import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NDS_QUERY_KEY } from './use-nds-rates';
import { ndsApi } from '../api/nds.api';

export function useRemoveNdsRate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...NDS_QUERY_KEY, 'remove'],
    mutationFn: ndsApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NDS_QUERY_KEY,
      });
    },
  });
}

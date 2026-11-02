import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NDS_QUERY_KEY } from './use-nds-rates';
import { ndsApi } from '../api/nds.api';

export function useCreateNdsRate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...NDS_QUERY_KEY, 'create'],
    mutationFn: ndsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NDS_QUERY_KEY,
      });
    },
  });
}

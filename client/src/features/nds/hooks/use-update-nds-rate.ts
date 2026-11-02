import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NDS_QUERY_KEY } from './use-nds-rates';
import { ndsApi } from '../api/nds.api';
import type { IUpdateNds } from '../types/nds.types';

export function useUpdateNdsRate(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...NDS_QUERY_KEY, id, 'update'],
    mutationFn: (data: IUpdateNds) => ndsApi.update({ id, updateData: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NDS_QUERY_KEY,
      });
    },
  });
}

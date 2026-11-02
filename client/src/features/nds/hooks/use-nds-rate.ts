import { useQuery } from '@tanstack/react-query';
import { ndsApi } from '../api/nds.api';
import { NDS_QUERY_KEY } from './use-nds-rates';

export function useNdsRate(id?: number) {
  return useQuery({
    queryKey: [...NDS_QUERY_KEY, id],
    queryFn: () => ndsApi.getNdsById(id!),
    enabled: id !== undefined,
  });
}

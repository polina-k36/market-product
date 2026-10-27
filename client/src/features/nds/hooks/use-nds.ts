import { useQuery } from '@tanstack/react-query';
import { ndsApi } from '../api/nds.api';

export const NDS_QUERY_KEY = ['nds'] as const;

export function useNds() {
  return useQuery({
    queryKey: NDS_QUERY_KEY,
    queryFn: ndsApi.getAll,
  });
}

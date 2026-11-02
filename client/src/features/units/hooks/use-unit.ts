import { useQuery } from '@tanstack/react-query';
import { UNITS_QUERY_KEY } from './use-units';
import { unitApi } from '../api/unit.api';

export function useUnit(id?: number) {
  return useQuery({
    queryKey: [...UNITS_QUERY_KEY, id],
    queryFn: () => unitApi.getUnitById(id!),
    enabled: id !== undefined,
  });
}

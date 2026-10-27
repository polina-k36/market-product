import { useQuery } from '@tanstack/react-query';
import { unitApi } from '../api/unit.api';

export const UNITS_QUERY_KEY = ['units'];

export function useUnits() {
  return useQuery({
    queryKey: UNITS_QUERY_KEY,
    queryFn: unitApi.getAll,
  });
}

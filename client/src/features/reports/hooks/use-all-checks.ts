import { useQuery } from '@tanstack/react-query';
import { reportApi } from '../api/report.api';

export const REPORTS_QUERY_KEY = ['reports'] as const;

export function useAllChecks(period: number) {
  return useQuery({
    queryKey: [...REPORTS_QUERY_KEY, 'all-checks', `period-${period}`],
    queryFn: () => reportApi.allChecks(period),
  });
}

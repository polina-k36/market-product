import { useQuery } from '@tanstack/react-query';
import { reportApi } from '../api/report.api';
import { REPORTS_QUERY_KEY } from './use-all-checks';

export function useChecksStates(period: number) {
  return useQuery({
    queryKey: [...REPORTS_QUERY_KEY, 'checks-states', `period-${period}`],
    queryFn: () => reportApi.checksStates(period),
  });
}

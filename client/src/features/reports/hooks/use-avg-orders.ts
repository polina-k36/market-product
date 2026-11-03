import { useQuery } from '@tanstack/react-query';
import { reportApi } from '../api/report.api';
import { REPORTS_QUERY_KEY } from './use-all-checks';

export function useAvgOrders(period: number) {
  return useQuery({
    queryKey: [...REPORTS_QUERY_KEY, 'avg-orders', `period-${period}`],
    queryFn: () => reportApi.avgOrders(period),
  });
}

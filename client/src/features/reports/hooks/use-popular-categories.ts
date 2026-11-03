import { useQuery } from '@tanstack/react-query';
import { reportApi } from '../api/report.api';
import { REPORTS_QUERY_KEY } from './use-all-checks';

export function usePopularCategories(period: number) {
  return useQuery({
    queryKey: [...REPORTS_QUERY_KEY, 'popular-categories', `period-${period}`],
    queryFn: () => reportApi.popularCategories(period),
  });
}

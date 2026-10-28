import { useQuery } from '@tanstack/react-query';
import { CATEGORIES_QUERY_KEY } from './use-categories';
import { categoriesApi } from '../api/categories.api';

export function useCategory(categoryId: number) {
  return useQuery({
    queryKey: [...CATEGORIES_QUERY_KEY, categoryId],
    queryFn: () => categoriesApi.getCategoryById(categoryId),
  });
}

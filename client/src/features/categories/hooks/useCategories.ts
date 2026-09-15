import { useSuspenseQuery } from '@tanstack/react-query';
import { categoriesApi } from '../api/categories.api';

export const CATEGORIES_QUERY_KEY = ['categories'];

export function useCategories() {
  return useSuspenseQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: categoriesApi.getCategories,
  });
}

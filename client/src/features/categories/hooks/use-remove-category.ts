import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CATEGORIES_QUERY_KEY } from './use-categories';
import { categoriesApi } from '../api/categories.api';

export function useRemoveCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...CATEGORIES_QUERY_KEY, 'remove'],
    mutationFn: categoriesApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CATEGORIES_QUERY_KEY,
      });
    },
  });
}

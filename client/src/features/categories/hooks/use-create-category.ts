import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CATEGORIES_QUERY_KEY } from './use-categories';
import { categoriesApi } from '../api/categories.api';

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...CATEGORIES_QUERY_KEY, 'create'],
    mutationFn: categoriesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CATEGORIES_QUERY_KEY,
      });
    },
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CATEGORIES_QUERY_KEY } from './use-categories';
import { categoriesApi } from '../api/categories.api';
import type { ICreateUpdateCategory } from '../types/categories.types';

export function useUpdateCategory(categoryId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...CATEGORIES_QUERY_KEY, categoryId, 'update'],
    mutationFn: (data: ICreateUpdateCategory) =>
      categoriesApi.update({
        categoryId,
        updateData: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CATEGORIES_QUERY_KEY,
      });
    },
  });
}

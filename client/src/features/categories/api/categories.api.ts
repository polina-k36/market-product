import { api } from '@/api/axios';
import type { CategoriesResponse, Category } from '../types/categories.types';

export const categoriesApi = {
  getCategories: async (): Promise<Category[]> => {
    const { data } = await api.get<CategoriesResponse>('/categories');
    return data.data;
  },
};

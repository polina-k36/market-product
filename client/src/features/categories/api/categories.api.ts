import { api } from '@/api/axios';
import type { IResponse } from '@/types/api/api-response.type';
import type { ICategory } from '../types/categories.types';

export const categoriesApi = {
  getCategories: async (): Promise<ICategory[]> => {
    const { data } = await api.get<IResponse<ICategory>>('/categories');
    return data.data;
  },
};

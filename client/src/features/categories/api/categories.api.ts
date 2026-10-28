import { api } from '@/api/axios';
import type { IResponse } from '@/types/api/api-response.type';
import type {
  ICategory,
  ICreateUpdateCategory,
  IFullCategory,
} from '../types/categories.types';

export const categoriesApi = {
  create: async (createData: ICreateUpdateCategory): Promise<ICategory> => {
    const { data } = await api.post<IResponse<ICategory>>(
      'categories',
      createData,
    );
    return data.data;
  },

  getCategories: async (): Promise<IFullCategory[]> => {
    const { data } = await api.get<IResponse<IFullCategory[]>>('/categories');
    return data.data;
  },

  getCategoryById: async (id: number): Promise<IFullCategory> => {
    const { data } = await api.get<IResponse<IFullCategory>>(
      `/categories/${id}`,
    );
    return data.data;
  },

  update: async ({
    categoryId,
    updateData,
  }: {
    categoryId: number;
    updateData: ICreateUpdateCategory;
  }): Promise<ICategory> => {
    const { data } = await api.patch<IResponse<ICategory>>(
      `categories/${categoryId}`,
      updateData,
    );
    return data.data;
  },

  remove: async (id: number): Promise<ICategory> => {
    const { data } = await api.delete<IResponse<ICategory>>(
      `/categories/${id}`,
    );
    return data.data;
  },
};

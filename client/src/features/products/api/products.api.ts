import { api } from '@/api/axios';
import type { IProductFilters, IPromoProduct } from '../types/products.types';
import type { IPaginationResponse } from '@/types/api/api-response.type';

export const productsApi = {
  getProducts: async (
    filters: IProductFilters,
  ): Promise<IPaginationResponse<IPromoProduct>> => {
    const { data } = await api.get<IPaginationResponse<IPromoProduct>>(
      'products',
      {
        params: filters,
      },
    );

    return data;
  },
};

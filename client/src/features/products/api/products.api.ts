import { api } from '@/api/axios';
import type {
  IFullProduct,
  IProductFilters,
  IPromoProduct,
} from '../types/products.types';
import type {
  IPaginationResponse,
  IResponse,
} from '@/types/api/api-response.type';

export const productsApi = {
  getProducts: async (
    filters: IProductFilters,
  ): Promise<IPaginationResponse<IPromoProduct>> => {
    const { data } = await api.get<IPaginationResponse<IPromoProduct>>(
      '/products',
      {
        params: filters,
      },
    );

    return data;
  },

  getProductById: async (id: number): Promise<IFullProduct> => {
    const { data } = await api.get<IResponse<IFullProduct>>(`/products/${id}`);
    return data.data;
  },
};

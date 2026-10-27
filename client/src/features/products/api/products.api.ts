import { api } from '@/api/axios';
import type {
  ICreatedProductInfo,
  ICreateProduct,
  IFullProduct,
  IProductFilters,
  IPromoProduct,
  IUpdateProduct,
} from '../types/products.types';
import type {
  IPaginationResponse,
  IResponse,
} from '@/types/api/api-response.type';

export const productsApi = {
  create: async (createdData: ICreateProduct): Promise<ICreatedProductInfo> => {
    const { data } = await api.post<IResponse<ICreatedProductInfo>>(
      'products',
      createdData,
    );

    return data.data;
  },
  update: async ({
    productId,
    updatedData,
  }: {
    productId: number;
    updatedData: IUpdateProduct;
  }): Promise<ICreatedProductInfo> => {
    const { data } = await api.patch<IResponse<ICreatedProductInfo>>(
      `products/${productId}`,
      updatedData,
    );

    return data.data;
  },
  remove: async (productId: number): Promise<ICreatedProductInfo> => {
    const { data } = await api.delete<IResponse<ICreatedProductInfo>>(
      `products/${productId}`,
    );

    return data.data;
  },
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

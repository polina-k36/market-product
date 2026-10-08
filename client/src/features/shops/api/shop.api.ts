import { api } from '@/api/axios';
import type { IShopData } from '../types/shop.types';
import type { IPaginationResponse } from '@/types/api/api-response.type';

export const shopApi = {
  getAll: async (): Promise<IShopData[]> => {
    const { data } = await api.get<IPaginationResponse<IShopData>>('/shops');
    return data.data;
  },
};

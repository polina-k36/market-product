import { api } from '@/api/axios';
import type { ICreateShop, IShopData, IUpdateShop } from '../types/shop.types';
import type {
  IPaginationResponse,
  IResponse,
} from '@/types/api/api-response.type';

export const shopApi = {
  create: async (createData: ICreateShop): Promise<IShopData> => {
    const { data } = await api.post<IResponse<IShopData>>(`/shops`, createData);
    return data.data;
  },
  update: async ({
    shopId,
    updateData,
  }: {
    shopId: number;
    updateData: IUpdateShop;
  }): Promise<IShopData> => {
    const { data } = await api.patch<IResponse<IShopData>>(
      `/shops/${shopId}`,
      updateData,
    );

    return data.data;
  },
  getById: async (id: number): Promise<IShopData> => {
    const { data } = await api.get<IResponse<IShopData>>(`/shops/${id}`);
    return data.data;
  },
  getAll: async (): Promise<IShopData[]> => {
    const { data } = await api.get<IPaginationResponse<IShopData>>('/shops');
    return data.data;
  },
  remove: async (shopId: number): Promise<IShopData> => {
    const { data } = await api.delete<IResponse<IShopData>>(`/shops/${shopId}`);

    return data.data;
  },
};

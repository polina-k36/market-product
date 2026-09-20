import { api } from '@/api/axios';
import type { IResponse } from '@/types/api/api-response.type';
import type { IOrder } from '../types/order.types';

export const ordersApi = {
  getMineOrders: async (): Promise<IOrder[]> => {
    const { data } = await api.get<IResponse<IOrder[]>>('orders/me');

    return data.data;
  },
};

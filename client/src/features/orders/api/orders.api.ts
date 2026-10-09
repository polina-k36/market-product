import { api } from '@/api/axios';
import type { IResponse } from '@/types/api/api-response.type';
import type { IFullOrder, IPromoOrder } from '../types/order.types';

export const ordersApi = {
  getMineOrders: async (): Promise<IPromoOrder[]> => {
    const { data } = await api.get<IResponse<IPromoOrder[]>>('orders/me');

    return data.data.map((order) => ({
      ...order,
      date: new Date(order.date),
    }));
  },
  getOrderById: async (id: number): Promise<IFullOrder> => {
    const { data } = await api.get<IResponse<IFullOrder>>(`/orders/${id}`);

    return {
      ...data.data,
      date: new Date(data.data.date),
    };
  },
  create: async () => {},
  getMineActiveOrders: async (): Promise<IPromoOrder[]> => {
    const { data } =
      await api.get<IResponse<IPromoOrder[]>>('orders/me/active');

    return data.data.map((order) => ({
      ...order,
      date: new Date(order.date),
    }));
  },
};

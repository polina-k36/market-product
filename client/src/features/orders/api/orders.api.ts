import { api } from '@/api/axios';
import type { IResponse } from '@/types/api/api-response.type';
import type {
  ICreateOrder,
  IFullOrder,
  IPromoOrder,
  IReturnProduct,
} from '../types/order.types';

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
  create: async (createData: ICreateOrder): Promise<IFullOrder> => {
    const { data } = await api.post<IResponse<IFullOrder>>(
      'orders',
      createData,
    );
    return data.data;
  },
  getMineActiveOrders: async (): Promise<IPromoOrder[]> => {
    const { data } =
      await api.get<IResponse<IPromoOrder[]>>('orders/me/active');

    return data.data.map((order) => ({
      ...order,
      date: new Date(order.date),
    }));
  },
  cancelOrder: async (id: number) => {
    const { data } = await api.post<IResponse<IFullOrder>>(
      `orders/${id}/cancel`,
    );
    return data.data;
  },

  returnOrder: async ({
    id,
    products,
  }: {
    id: number;
    products: IReturnProduct[];
  }) => {
    const { data } = await api.post<IResponse<IFullOrder>>(
      `orders/${id}/return`,
      {
        products,
      },
    );
    return data.data;
  },
};

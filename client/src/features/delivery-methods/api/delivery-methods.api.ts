import { api } from '@/api/axios';

import type { IResponse } from '@/types/api/api-response.type';
import type {
  ICreateUpdateDeliveryMethod,
  IDeliveryMethod,
} from '../types/delivery-methods.types';

export const deliveryMethodApi = {
  getDeliveryMethods: async () => {
    const { data } =
      await api.get<IResponse<IDeliveryMethod[]>>('/delivery-methods');

    return data.data;
  },

  getDeliveryMethod: async (id: number) => {
    const { data } = await api.get<IResponse<IDeliveryMethod>>(
      `/delivery-methods/${id}`,
    );

    return data.data;
  },

  create: async (createData: ICreateUpdateDeliveryMethod) => {
    const { data } = await api.post<IResponse<IDeliveryMethod>>(
      '/delivery-methods',
      createData,
    );

    return data.data;
  },

  update: async ({
    id,
    updateData,
  }: {
    id: number;
    updateData: ICreateUpdateDeliveryMethod;
  }) => {
    const { data } = await api.patch<IResponse<IDeliveryMethod>>(
      `/delivery-methods/${id}`,
      updateData,
    );

    return data.data;
  },

  remove: async (id: number) => {
    const { data } = await api.delete<IResponse<IDeliveryMethod>>(
      `/delivery-methods/${id}`,
    );

    return data.data;
  },
};

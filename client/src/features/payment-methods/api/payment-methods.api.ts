import { api } from '@/api/axios';
import type {
  ICreateUpdatePaymentMethod,
  IPaymentMethod,
} from '../types/payment-methods.types';
import type { IResponse } from '@/types/api/api-response.type';

export const paymentMethodApi = {
  getAll: async () => {
    const { data } =
      await api.get<IResponse<IPaymentMethod[]>>('/payment-methods');

    return data.data;
  },
  getPaymentMethodById: async (id: number) => {
    const { data } = await api.get<IResponse<IPaymentMethod>>(
      `/payment-methods/${id}`,
    );

    return data.data;
  },
  create: async (createData: ICreateUpdatePaymentMethod) => {
    const { data } = await api.post<IResponse<IPaymentMethod>>(
      '/payment-methods',
      createData,
    );

    return data.data;
  },
  update: async ({
    id,
    updateData,
  }: {
    id: number;
    updateData: ICreateUpdatePaymentMethod;
  }) => {
    const { data } = await api.patch<IResponse<IPaymentMethod>>(
      `/payment-methods/${id}`,
      updateData,
    );

    return data.data;
  },
  remove: async (id: number) => {
    const { data } = await api.delete<IResponse<IPaymentMethod>>(
      `/payment-methods/${id}`,
    );

    return data.data;
  },
};

import { api } from '@/api/axios';
import type {
  ICreateUpdatePaymentMethod,
  IPaymentMethod,
} from '../types/payment-methods.types';
import type { IResponse } from '@/types/api/api-response.type';

export const paymentMethodApi = {
  getPaymentMethods: async () => {
    const response =
      await api.get<IResponse<IPaymentMethod[]>>('/payment-methods');

    return response.data;
  },
  getPaymentMethod: async (id: number) => {
    const response = await api.get<IResponse<IPaymentMethod>>(
      `/payment-methods/${id}`,
    );

    return response.data;
  },
  create: async (createData: ICreateUpdatePaymentMethod) => {
    const response = await api.post<IResponse<IPaymentMethod>>(
      '/payment-methods',
      createData,
    );

    return response.data;
  },
  update: async ({
    id,
    updateData,
  }: {
    id: number;
    updateData: ICreateUpdatePaymentMethod;
  }) => {
    const response = await api.patch<IResponse<IPaymentMethod>>(
      `/payment-methods/${id}`,
      updateData,
    );

    return response.data;
  },
  remove: async (id: number) => {
    const response = await api.delete<IResponse<IPaymentMethod>>(
      `/payment-methods/${id}`,
    );

    return response.data;
  },
};

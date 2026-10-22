import { api } from '@/api/axios';
import type { IResponse } from '@/types/api/api-response.type';
import type { IAddress, ICreateUpdateAddress } from '../types/address.types';

export const addressApi = {
  getAddressById: async (id: number): Promise<IAddress> => {
    const { data } = await api.get<IResponse<IAddress>>(
      `/user-addresses/${id}`,
    );
    console.log(data);
    return data.data;
  },
  getAllAddresses: async (): Promise<IAddress[]> => {
    const { data } = await api.get<IResponse<IAddress[]>>(`/user-addresses`);
    return data.data;
  },
  updateAddressById: async (
    id: number,
    updateAddress: ICreateUpdateAddress,
  ): Promise<IAddress> => {
    const { data } = await api.patch<IResponse<IAddress>>(
      `/user-addresses/${id}`,
      updateAddress,
    );
    return data.data;
  },
  createAddress: async (
    createAddress: ICreateUpdateAddress,
  ): Promise<IAddress> => {
    const { data } = await api.post<IResponse<IAddress>>(
      `/user-addresses`,
      createAddress,
    );
    return data.data;
  },
  removeAddress: async (id: number): Promise<IAddress> => {
    const { data } = await api.delete<IResponse<IAddress>>(
      `/user-addresses/${id}`,
    );
    return data.data;
  },
};

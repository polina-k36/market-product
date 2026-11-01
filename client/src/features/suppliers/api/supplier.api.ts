import { api } from '@/api/axios';
import type {
  ICreateSupplier,
  ISupplier,
  IUpdateSupplier,
} from '../types/supplier.types';
import type { IResponse } from '@/types/api/api-response.type';

export const supplierApi = {
  create: async (createdData: ICreateSupplier): Promise<ISupplier> => {
    const { data } = await api.post<IResponse<ISupplier>>(
      'suppliers',
      createdData,
    );

    return data.data;
  },

  update: async ({
    supplierId,
    updatedData,
  }: {
    supplierId: number;
    updatedData: IUpdateSupplier;
  }): Promise<ISupplier> => {
    const { data } = await api.patch<IResponse<ISupplier>>(
      `suppliers/${supplierId}`,
      updatedData,
    );

    return data.data;
  },

  remove: async (supplierId: number): Promise<ISupplier> => {
    const { data } = await api.delete<IResponse<ISupplier>>(
      `suppliers/${supplierId}`,
    );

    return data.data;
  },

  getSuppliers: async (): Promise<ISupplier[]> => {
    const { data } = await api.get<IResponse<ISupplier[]>>('/suppliers');

    return data.data;
  },

  getSupplierById: async (id: number): Promise<ISupplier> => {
    const { data } = await api.get<IResponse<ISupplier>>(`/suppliers/${id}`);

    return data.data;
  },
};

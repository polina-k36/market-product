import { api } from '@/api/axios';
import type {
  ICreatedSupplierInfo,
  ICreateSupplier,
  ISupplier,
  IUpdateSupplier,
} from '../types/supplier.types';
import type { IResponse } from '@/types/api/api-response.type';

export const supplierApi = {
  create: async (
    createdData: ICreateSupplier,
  ): Promise<ICreatedSupplierInfo> => {
    const { data } = await api.post<IResponse<ICreatedSupplierInfo>>(
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
  }): Promise<ICreatedSupplierInfo> => {
    const { data } = await api.patch<IResponse<ICreatedSupplierInfo>>(
      `suppliers/${supplierId}`,
      updatedData,
    );

    return data.data;
  },

  remove: async (supplierId: number): Promise<ICreatedSupplierInfo> => {
    const { data } = await api.delete<IResponse<ICreatedSupplierInfo>>(
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

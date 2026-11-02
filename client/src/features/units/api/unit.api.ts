import { api } from '@/api/axios';
import type { IResponse } from '@/types/api/api-response.type';
import type { IUnit, ICreateUnit, IUpdateUnit } from '../types/unit.types';

export const unitApi = {
  getAll: async (): Promise<IUnit[]> => {
    const { data } = await api.get<IResponse<IUnit[]>>('/units');
    return data.data;
  },

  getUnitById: async (id: number) => {
    const { data } = await api.get<IResponse<IUnit>>(`/units/${id}`);

    return data.data;
  },

  create: async (createData: ICreateUnit) => {
    const { data } = await api.post<IResponse<IUnit>>('/units', createData);

    return data.data;
  },

  update: async ({
    id,
    updateData,
  }: {
    id: number;
    updateData: IUpdateUnit;
  }) => {
    const { data } = await api.patch<IResponse<IUnit>>(
      `/units/${id}`,
      updateData,
    );

    return data.data;
  },

  remove: async (id: number) => {
    const { data } = await api.delete<IResponse<IUnit>>(`/units/${id}`);

    return data.data;
  },
};

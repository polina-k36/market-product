import { api } from '@/api/axios';
import type { IResponse } from '@/types/api/api-response.type';
import type { ICreateNds, INds, IUpdateNds } from '../types/nds.types';

export const ndsApi = {
  getAll: async (): Promise<INds[]> => {
    const { data } = await api.get<IResponse<INds[]>>('/nds');
    return data.data;
  },

  getNdsById: async (id: number) => {
    const { data } = await api.get<IResponse<INds>>(`/nds/${id}`);

    return data.data;
  },
  create: async (createData: ICreateNds) => {
    const { data } = await api.post<IResponse<INds>>('/nds', createData);

    return data.data;
  },
  update: async ({
    id,
    updateData,
  }: {
    id: number;
    updateData: IUpdateNds;
  }) => {
    const { data } = await api.patch<IResponse<INds>>(`/nds/${id}`, updateData);

    return data.data;
  },
  remove: async (id: number) => {
    const { data } = await api.delete<IResponse<INds>>(`/nds/${id}`);

    return data.data;
  },
};

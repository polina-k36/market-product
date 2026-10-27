import { api } from '@/api/axios';
import type { IResponse } from '@/types/api/api-response.type';
import type { INds } from '../types/nds.types';

export const ndsApi = {
  getAll: async (): Promise<INds[]> => {
    const { data } = await api.get<IResponse<INds[]>>('nds');
    return data.data;
  },
};

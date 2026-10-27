import { api } from '@/api/axios';
import type { IUnit } from '../types/unit.types';
import type { IResponse } from '@/types/api/api-response.type';

export const unitApi = {
  getAll: async (): Promise<IUnit[]> => {
    const { data } = await api.get<IResponse<IUnit[]>>('units');

    return data.data;
  },
};

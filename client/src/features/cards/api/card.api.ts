import { api } from '@/api/axios';
import type { IUserCard } from '../types/card.types';
import type { IResponse } from '@/types/api/api-response.type';

export const cardApi = {
  getAllUserCards: async (): Promise<IUserCard[]> => {
    const { data } = await api.get<IResponse<IUserCard[]>>('/user-cards');
    return data.data;
  },
};

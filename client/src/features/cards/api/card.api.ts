import { api } from '@/api/axios';
import type { ICreateCard, IUserCard } from '../types/card.types';
import type { IResponse } from '@/types/api/api-response.type';

export const cardApi = {
  getAllUserCards: async (): Promise<IUserCard[]> => {
    const { data } = await api.get<IResponse<IUserCard[]>>('/user-cards');
    return data.data;
  },
  create: async (createData: ICreateCard): Promise<IUserCard> => {
    const { data } = await api.post<IResponse<IUserCard>>('/user-cards', {
      ...createData,
      cardBrand: createData.cardBrand ?? 'MIR',
    });
    return data.data;
  },
};

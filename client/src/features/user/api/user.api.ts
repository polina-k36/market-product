import { api } from '@/api/axios';
import type {
  IFullInfoUser,
  IUpdatedUserRes,
  IUpdateUser,
} from '../types/user.types';
import type {
  IPaginationResponse,
  IResponse,
} from '@/types/api/api-response.type';
import type { ChangePasswordFormValues } from '../schemas/change-password.schema';

export const userApi = {
  findAllUsers: async (): Promise<IPaginationResponse<IFullInfoUser>> => {
    const { data } =
      await api.get<IPaginationResponse<IFullInfoUser>>('/users');
    return data;
  },
  updateUserById: async (updateUser: IUpdateUser): Promise<IUpdatedUserRes> => {
    const { data } = await api.patch<IResponse<IUpdatedUserRes>>(
      `/users/me`,
      updateUser,
    );
    return data.data;
  },
  changePassword: async (
    data: ChangePasswordFormValues,
  ): Promise<{ message: string }> => {
    const { data: response } = await api.patch<{
      success: true;
      message: string;
    }>('/users/password', data);
    return { message: response.message };
  },
};

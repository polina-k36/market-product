import { api } from '@/api/axios';
import type {
  IAuthResponse,
  IFullUserInfo,
  ILoginProps,
  IRegisterProps,
} from '../types/auth.types';
import type { IAuthUser } from '@/types/auth/auth.types';
import type { IResponse } from '@/types/api/api-response.type';

export const authApi = {
  login: async (
    body: ILoginProps,
  ): Promise<{ accessToken: string; user: IAuthUser }> => {
    const { data } = await api.post<IAuthResponse>('/auth/login', {
      login: body.login,
      password: body.password,
    });
    return {
      accessToken: data.accessToken,
      user: data.data,
    };
  },
  register: async (
    body: IRegisterProps,
  ): Promise<{ accessToken: string; user: IAuthUser }> => {
    const { data } = await api.post<IAuthResponse>('/auth/register', {
      name: body.name,
      login: body.login,
      password: body.password,
    });
    return {
      accessToken: data.accessToken,
      user: data.data,
    };
  },
  loginGoogle: async (
    credential: string,
  ): Promise<{ accessToken: string; user: IAuthUser }> => {
    const { data } = await api.post<IAuthResponse>('/auth/google', {
      credential,
    });
    return {
      accessToken: data.accessToken,
      user: data.data,
    };
  },
  logout: async (): Promise<{ message: string }> => {
    const { data } = await api.post<{ success: true; message: string }>(
      '/auth/logout',
    );
    return {
      message: data.message,
    };
  },
  refresh: async (): Promise<{ accessToken: string; user: IAuthUser }> => {
    const { data } = await api.post<IAuthResponse>('/auth/refresh');
    return {
      accessToken: data.accessToken,
      user: data.data,
    };
  },
  getProfile: async (): Promise<IFullUserInfo> => {
    const { data } = await api.get<IResponse<IFullUserInfo>>('/auth/profile');

    return data.data;
  },
};

import { api } from '@/api/axios';

export const verificationApi = {
  sendLink: async (): Promise<string> => {
    const { data } = await api.post<{ success: true; message: string }>(
      '/verifications/email/send?method=LINK',
    );
    return data.message;
  },
  sendCode: async (): Promise<string> => {
    const { data } = await api.post<{ success: true; message: string }>(
      '/verifications/email/send?method=CODE',
    );
    return data.message;
  },
  confirmEmail: async (
    value: string,
  ): Promise<{ accessToken: string; message: string }> => {
    const { data } = await api.post<{
      success: true;
      accessToken: string;
      message: string;
    }>(`/verifications/email/confirm?value=${value}`);
    return {
      accessToken: data.accessToken,
      message: data.message,
    };
  },
};

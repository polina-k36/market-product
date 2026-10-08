import { useMutation } from '@tanstack/react-query';
import { userApi } from '../api/user.api';

export const USER_QUERY_KEY = ['users'] as const;

export function useUpdateUserInfo() {
  return useMutation({
    mutationKey: [...USER_QUERY_KEY, 'update-info'],
    mutationFn: userApi.updateUserById,
  });
}

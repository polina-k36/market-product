import { useMutation } from '@tanstack/react-query';
import { userApi } from '../api/user.api';
import type { ChangePasswordFormValues } from '../schemas/change-password.schema';

export const CHANGE_PASSWORD_MUTATION_KEY = [
  'user',
  'change-password',
] as const;

export function useChangePassword() {
  return useMutation({
    mutationKey: CHANGE_PASSWORD_MUTATION_KEY,

    mutationFn: (data: ChangePasswordFormValues) =>
      userApi.changePassword(data),
  });
}

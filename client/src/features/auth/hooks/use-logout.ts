import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';

export const LOGOUT_MUTATION_KEY = ['auth', 'logout'] as const;

export function useLogout() {
  return useMutation({
    mutationKey: LOGOUT_MUTATION_KEY,
    mutationFn: authApi.logout,
  });
}

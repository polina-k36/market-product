import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';

export const LOGIN_MUTATION_KEY = ['auth', 'login'] as const;

export function useLogin() {
  return useMutation({
    mutationKey: LOGIN_MUTATION_KEY,
    mutationFn: authApi.login,
  });
}

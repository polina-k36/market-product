import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';

export const REGISTER_MUTATION_KEY = ['auth', 'register'] as const;

export function useRegister() {
  return useMutation({
    mutationKey: REGISTER_MUTATION_KEY,
    mutationFn: authApi.register,
  });
}

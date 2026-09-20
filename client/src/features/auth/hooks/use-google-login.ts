import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';

export const GOOGLE_MUTATION_KEY = ['auth', 'google'] as const;

export function useGoogleLogin() {
  return useMutation({
    mutationKey: GOOGLE_MUTATION_KEY,
    mutationFn: authApi.loginGoogle,
  });
}

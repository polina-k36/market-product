import { useMutation } from '@tanstack/react-query';
import { verificationApi } from '../api/verification.api';

export const VERIFICATION_EMAIL_QUERY_KEY = ['verification-email'] as const;

export function useEmailConfirm() {
  return useMutation({
    mutationKey: [...VERIFICATION_EMAIL_QUERY_KEY, 'confirm'],
    mutationFn: verificationApi.confirmEmail,
  });
}

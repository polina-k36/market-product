import { useMutation } from '@tanstack/react-query';
import { VERIFICATION_EMAIL_QUERY_KEY } from './use-email-confirm';
import { verificationApi } from '../api/verification.api';

export function useCodeEmail() {
  return useMutation({
    mutationKey: [...VERIFICATION_EMAIL_QUERY_KEY, 'send-code'],
    mutationFn: verificationApi.sendCode,
  });
}

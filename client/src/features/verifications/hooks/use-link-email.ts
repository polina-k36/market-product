import { useMutation } from '@tanstack/react-query';
import { VERIFICATION_EMAIL_QUERY_KEY } from './use-email-confirm';
import { verificationApi } from '../api/verification.api';

export function useLinkEmail() {
  return useMutation({
    mutationKey: [...VERIFICATION_EMAIL_QUERY_KEY, 'send-link'],
    mutationFn: verificationApi.sendLink,
  });
}

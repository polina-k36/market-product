import { useQuery } from '@tanstack/react-query';
import { paymentMethodApi } from '../api/payment-methods.api';

export const PAYMENT_METHODS_QUERY_KEY = ['payment-methods'] as const;

export function usePaymentMethods() {
  return useQuery({
    queryKey: PAYMENT_METHODS_QUERY_KEY,
    queryFn: paymentMethodApi.getAll,
  });
}

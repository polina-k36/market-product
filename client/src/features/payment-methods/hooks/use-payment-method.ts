import { useQuery } from '@tanstack/react-query';
import { paymentMethodApi } from '../api/payment-methods.api';
import { PAYMENT_METHODS_QUERY_KEY } from './use-payment-methods';

export const usePaymentMethod = (id?: number) => {
  return useQuery({
    queryKey: [...PAYMENT_METHODS_QUERY_KEY, id],
    queryFn: () => paymentMethodApi.getPaymentMethod(id!),
    enabled: id !== undefined,
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentMethodApi } from '../api/payment-methods.api';
import { PAYMENT_METHODS_QUERY_KEY } from './use-payment-methods';

export const useCreatePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...PAYMENT_METHODS_QUERY_KEY, 'create'],
    mutationFn: paymentMethodApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PAYMENT_METHODS_QUERY_KEY,
      });
    },
  });
};

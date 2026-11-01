import { useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentMethodApi } from '../api/payment-methods.api';
import { PAYMENT_METHODS_QUERY_KEY } from './use-payment-methods';

export const useRemovePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentMethodApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PAYMENT_METHODS_QUERY_KEY,
      });
    },
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentMethodApi } from '../api/payment-methods.api';
import { PAYMENT_METHODS_QUERY_KEY } from './use-payment-methods';

export function useUpdatePaymentMethod(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...PAYMENT_METHODS_QUERY_KEY, id, 'update'],
    mutationFn: (data: { title: string }) =>
      paymentMethodApi.update({ id, updateData: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PAYMENT_METHODS_QUERY_KEY,
      });
    },
  });
}

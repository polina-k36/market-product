import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deliveryMethodApi } from '../api/delivery-methods.api';
import { DELIVERY_METHODS_QUERY_KEY } from './use-delivery-methods';

export const useUpdateDeliveryMethod = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...DELIVERY_METHODS_QUERY_KEY, id, 'update'],
    mutationFn: (data: { title: string }) =>
      deliveryMethodApi.update({ id, updateData: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DELIVERY_METHODS_QUERY_KEY,
      });
    },
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deliveryMethodApi } from '../api/delivery-methods.api';
import { DELIVERY_METHODS_QUERY_KEY } from './use-delivery-methods';

export const useCreateDeliveryMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...DELIVERY_METHODS_QUERY_KEY, 'create'],
    mutationFn: deliveryMethodApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DELIVERY_METHODS_QUERY_KEY,
      });
    },
  });
};

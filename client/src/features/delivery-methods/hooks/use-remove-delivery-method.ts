import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deliveryMethodApi } from '../api/delivery-methods.api';
import { DELIVERY_METHODS_QUERY_KEY } from './use-delivery-methods';

export const useRemoveDeliveryMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deliveryMethodApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DELIVERY_METHODS_QUERY_KEY,
      });
    },
  });
};

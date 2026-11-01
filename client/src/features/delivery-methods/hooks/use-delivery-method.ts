import { useQuery } from '@tanstack/react-query';
import { deliveryMethodApi } from '../api/delivery-methods.api';
import { DELIVERY_METHODS_QUERY_KEY } from './use-delivery-methods';

export const useDeliveryMethod = (id?: number) => {
  return useQuery({
    queryKey: [...DELIVERY_METHODS_QUERY_KEY, id],
    queryFn: () => deliveryMethodApi.getDeliveryMethod(id!),
    enabled: id !== undefined,
  });
};

import { useQuery } from '@tanstack/react-query';
import { deliveryMethodApi } from '../api/delivery-methods.api';

export const DELIVERY_METHODS_QUERY_KEY = ['delivery-methods'] as const;

export const useDeliveryMethods = () => {
  return useQuery({
    queryKey: DELIVERY_METHODS_QUERY_KEY,
    queryFn: deliveryMethodApi.getDeliveryMethods,
  });
};

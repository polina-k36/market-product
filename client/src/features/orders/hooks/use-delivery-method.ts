import { useSearchParams } from 'react-router';
import type { DeliveryMethod } from '../types/order.types';

export function useDeliveryMethod() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setMethod = (method: DeliveryMethod) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      next.set('deliveryMethod', method);

      return next;
    });
  };

  return {
    method: searchParams.get('deliveryMethod') as DeliveryMethod,
    setMethod,
  };
}

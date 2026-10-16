import { useSearchParams } from 'react-router';
import type { PaymentMethod } from '../types/order.types';

export function usePaymentMethod() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setMethod = (method: PaymentMethod) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      next.set('paymentMethod', method);

      return next;
    });
  };

  return {
    method: searchParams.get('paymentMethod') as PaymentMethod,
    setMethod,
  };
}

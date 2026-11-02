import { useQuery } from '@tanstack/react-query';
import { invoiceApi } from '../api/invoice.api';
import { INVOICES_QUERY_KEY } from './use-all-invoices';

export function useIncomingInvoices() {
  return useQuery({
    queryKey: [INVOICES_QUERY_KEY, 'incoming'],
    queryFn: invoiceApi.getAllIncoming,
  });
}

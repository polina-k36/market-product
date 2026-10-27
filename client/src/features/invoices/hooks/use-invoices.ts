import { useQuery } from '@tanstack/react-query';
import { invoiceApi } from '../api/invoice.api';

export const INVOICES_QUERY_KEY = ['invoices'];

export function useInvoices() {
  return useQuery({
    queryKey: INVOICES_QUERY_KEY,
    queryFn: invoiceApi.getAll,
  });
}

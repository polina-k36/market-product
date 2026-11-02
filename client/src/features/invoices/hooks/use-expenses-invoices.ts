import { useQuery } from '@tanstack/react-query';
import { invoiceApi } from '../api/invoice.api';
import { INVOICES_QUERY_KEY } from './use-all-invoices';

export function useExpensesInvoices() {
  return useQuery({
    queryKey: [INVOICES_QUERY_KEY, 'expenses'],
    queryFn: invoiceApi.getAllExpenses,
  });
}

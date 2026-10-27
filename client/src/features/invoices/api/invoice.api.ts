import { api } from '@/api/axios';
import type { IInvoice } from '../types/invoice.types';
import type { IPaginationResponse } from '@/types/api/api-response.type';

export const invoiceApi = {
  getAll: async (): Promise<IInvoice[]> => {
    const { data } = await api.get<IPaginationResponse<IInvoice>>('/invoices');
    return data.data;
  },
};

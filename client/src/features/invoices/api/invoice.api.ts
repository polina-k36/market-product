import { api } from '@/api/axios';
import type { IInvoice } from '../types/invoice.types';
import type { IPaginationResponse } from '@/types/api/api-response.type';
export const invoiceApi = {
  getAll: async (): Promise<IInvoice[]> => {
    const { data } = await api.get<IPaginationResponse<IInvoice>>('/invoices');
    return data.data;
  },
  getAllIncoming: async (): Promise<IInvoice[]> => {
    const { data } = await api.get<IPaginationResponse<IInvoice>>('/invoices', {
      params: {
        invoiceTypeId: 1,
      },
    });
    return data.data;
  },
  getAllExpenses: async (): Promise<IInvoice[]> => {
    const { data } = await api.get<IPaginationResponse<IInvoice>>('/invoices', {
      params: {
        invoiceTypeId: 2,
      },
    });
    return data.data;
  },
  getAllReturnedOrder: async (): Promise<IInvoice[]> => {
    const { data } = await api.get<IPaginationResponse<IInvoice>>('/invoices', {
      params: {
        invoiceTypeId: 3,
      },
    });
    return data.data;
  },
  exportInvoicePdf: async (id: number): Promise<Blob> => {
    const response = await api.get(`/invoices/${id}/pdf`, {
      responseType: 'blob',
    });

    return response.data;
  },
};

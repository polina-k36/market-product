import type { IAdminTableColumn } from '@/components/ui/table/admin-table.types';
import type { IInvoice } from '../types/invoice.types';

export const invoiceColumns: IAdminTableColumn<IInvoice>[] = [
  {
    key: 'id',
    title: '#',
    width: 60,
    minWidth: 50,
    align: 'center',
    value: (invoice) => invoice.id,
  },
  {
    key: 'date',
    title: 'Дата',
    width: 180,
    minWidth: 130,
    align: 'left',
    value: (invoice) => invoice.date,
  },
  {
    key: 'shop',
    title: 'Адрес магазина',
    width: 180,
    minWidth: 130,
    align: 'left',
    value: (invoice) => invoice.shop,
  },
  {
    key: 'invoiceType',
    title: 'Тип накладной',
    width: 180,
    minWidth: 130,
    align: 'left',
    value: (invoice) => invoice.invoiceType,
  },
  {
    key: 'supplier',
    title: 'Поставщик',
    width: 180,
    minWidth: 130,
    align: 'left',
    value: (invoice) => invoice.supplier,
  },
  {
    key: 'orderId',
    title: 'Номер заказа',
    width: 180,
    minWidth: 130,
    align: 'left',
    value: (invoice) => invoice.orderId,
  },
];

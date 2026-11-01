import type { IAdminTableColumn } from '@/components/ui/table/admin-table.types';
import type { IPaymentMethod } from '../types/payment-methods.types';
import { formatDateTime } from '@/utils/format-date.utils';

export const paymentMethodColumns: IAdminTableColumn<IPaymentMethod>[] = [
  {
    key: 'id',
    title: '#',
    width: 70,
    minWidth: 50,
    align: 'center',
    value: (paymentMethod) => paymentMethod.id,
  },
  {
    key: 'title',
    title: 'Наименование',
    width: 240,
    minWidth: 160,
    value: (paymentMethod) => paymentMethod.title,
  },
  {
    key: 'createdAt',
    title: 'Дата создания',
    width: 180,
    minWidth: 150,
    value: (paymentMethod) => formatDateTime(paymentMethod.createdAt),
  },
  {
    key: 'updatedAt',
    title: 'Дата обновления',
    width: 180,
    minWidth: 150,
    value: (paymentMethod) => formatDateTime(paymentMethod.updatedAt),
  },
];

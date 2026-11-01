import type { IAdminTableColumn } from '@/components/ui/table/admin-table.types';
import type { IDeliveryMethod } from '../types/delivery-methods.types';
import { formatDateTime } from '@/utils/format-date.utils';

export const deliveryMethodColumns: IAdminTableColumn<IDeliveryMethod>[] = [
  {
    key: 'id',
    title: '#',
    width: 70,
    minWidth: 50,
    align: 'center',
    value: (deliveryMethod) => deliveryMethod.id,
  },
  {
    key: 'title',
    title: 'Наименование',
    width: 240,
    minWidth: 160,
    value: (deliveryMethod) => deliveryMethod.title,
  },
  {
    key: 'createdAt',
    title: 'Дата создания',
    width: 180,
    minWidth: 150,
    value: (deliveryMethod) => formatDateTime(deliveryMethod.createdAt),
  },
  {
    key: 'updatedAt',
    title: 'Дата обновления',
    width: 180,
    minWidth: 150,
    value: (deliveryMethod) => formatDateTime(deliveryMethod.updatedAt),
  },
];

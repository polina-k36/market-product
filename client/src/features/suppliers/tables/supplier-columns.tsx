import type { IAdminTableColumn } from '@/components/ui/table/admin-table.types';
import type { ISupplier } from '../types/supplier.types';
import { formatDateTime } from '@/utils/format-date.utils';

export const supplierColumns: IAdminTableColumn<ISupplier>[] = [
  {
    key: 'id',
    title: '#',
    width: 70,
    minWidth: 50,
    align: 'center',
    value: (supplier) => supplier.id,
  },
  {
    key: 'title',
    title: 'Наименование',
    width: 240,
    minWidth: 160,
    value: (supplier) => supplier.title,
  },
  {
    key: 'createdAt',
    title: 'Дата создания',
    width: 180,
    minWidth: 150,
    value: (supplier) => formatDateTime(supplier.createdAt),
  },
  {
    key: 'updatedAt',
    title: 'Дата обновления',
    width: 180,
    minWidth: 150,
    value: (supplier) => formatDateTime(supplier.updatedAt),
  },
];

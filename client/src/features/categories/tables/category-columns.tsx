import type { IAdminTableColumn } from '@/components/ui/table/admin-table.types';
import type { IFullCategory } from '../types/categories.types';
import { formatDateTime } from '@/utils/format-date.utils';

export const categoryColumns: IAdminTableColumn<IFullCategory>[] = [
  {
    key: 'id',
    title: '#',
    width: 60,
    minWidth: 50,
    align: 'center',
    value: (category) => category.id,
  },
  {
    key: 'title',
    title: 'Название категории',
    width: 180,
    minWidth: 130,
    align: 'left',
    value: (category) => category.title,
  },
  {
    key: 'createdAt',
    title: 'Дата создания',
    width: 180,
    minWidth: 130,
    align: 'left',
    value: (category) => formatDateTime(category.createdAt),
  },
  {
    key: 'updatedAt',
    title: 'Дата последнего обновления',
    width: 180,
    minWidth: 130,
    align: 'left',
    value: (category) => formatDateTime(category.updatedAt),
  },
];

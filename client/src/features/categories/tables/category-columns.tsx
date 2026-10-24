import type { IAdminTableColumn } from '@/components/ui/table/admin-table.types';
import type { ICategory } from '../types/categories.types';

export const categoryColumns: IAdminTableColumn<ICategory>[] = [
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
];

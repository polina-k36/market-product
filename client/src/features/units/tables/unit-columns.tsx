import type { IAdminTableColumn } from '@/components/ui/table/admin-table.types';
import { formatDateTime } from '@/utils/format-date.utils';
import type { IUnit } from '../types/unit.types';

export const unitColumns: IAdminTableColumn<IUnit>[] = [
  {
    key: 'id',
    title: '#',
    width: 70,
    minWidth: 50,
    align: 'center',
    value: (unit) => unit.id,
  },
  {
    key: 'shortTitle',
    title: 'Краткое название',
    width: 180,
    minWidth: 130,
    value: (unit) => unit.shortTitle,
  },
  {
    key: 'fullTitle',
    title: 'Полное название',
    width: 240,
    minWidth: 160,
    value: (unit) => unit.fullTitle,
  },
  {
    key: 'createdAt',
    title: 'Дата создания',
    width: 180,
    minWidth: 150,
    value: (unit) => formatDateTime(unit.createdAt),
  },
  {
    key: 'updatedAt',
    title: 'Дата обновления',
    width: 180,
    minWidth: 150,
    value: (unit) => formatDateTime(unit.updatedAt),
  },
];

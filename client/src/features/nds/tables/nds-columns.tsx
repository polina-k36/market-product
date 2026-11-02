import type { IAdminTableColumn } from '@/components/ui/table/admin-table.types';
import { formatDateTime } from '@/utils/format-date.utils';
import type { INds } from '../types/nds.types';

export const ndsColumns: IAdminTableColumn<INds>[] = [
  {
    key: 'id',
    title: '#',
    width: 70,
    minWidth: 50,
    align: 'center',
    value: (nds) => nds.id,
  },
  {
    key: 'title',
    title: 'Наименование ставки',
    width: 240,
    minWidth: 160,
    value: (nds) => nds.titleRate,
  },
  {
    key: 'title',
    title: 'Ставка НДС, %',
    width: 130,
    minWidth: 100,
    align: 'center',
    value: (nds) => nds.rate,
  },
  {
    key: 'createdAt',
    title: 'Дата создания',
    width: 180,
    minWidth: 150,
    value: (nds) => formatDateTime(nds.createdAt),
  },
  {
    key: 'updatedAt',
    title: 'Дата обновления',
    width: 180,
    minWidth: 150,
    value: (nds) => formatDateTime(nds.updatedAt),
  },
];

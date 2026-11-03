import type { IAdminTableColumn } from '@/components/ui/table/admin-table.types';
import type { IAllChecksReport } from '../types/reports.types';

export const allChecksColumns: IAdminTableColumn<IAllChecksReport>[] = [
  {
    key: 'id',
    title: '#',
    width: 60,
    minWidth: 50,
    align: 'center',
    value: (report) => report.id,
  },
  {
    key: 'date',
    title: 'Дата',
    width: 130,
    minWidth: 110,
    value: (report) => report.date,
  },
  {
    key: 'shopAddress',
    title: 'Адрес магазина',
    width: 240,
    minWidth: 170,
    maxLines: 2,
    value: (report) => report.shopAddress,
  },
  {
    key: 'ordersCount',
    title: 'Количество заказов',
    width: 160,
    minWidth: 130,
    align: 'center',
    value: (report) => report.ordersCount,
  },
];

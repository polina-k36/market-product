import type { IAdminTableColumn } from '@/components/ui/table/admin-table.types';
import type { IChecksStateReport } from '../types/reports.types';

export const checksStateColumns: IAdminTableColumn<IChecksStateReport>[] = [
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
    key: 'completedOrders',
    title: 'Выполненные',
    width: 140,
    minWidth: 110,
    align: 'center',
    value: (report) => report.completedOrders,
  },
  {
    key: 'cancelledOrders',
    title: 'Отменённые',
    width: 130,
    minWidth: 110,
    align: 'center',
    value: (report) => report.cancelledOrders,
  },
];

import type { IAdminTableColumn } from '@/components/ui/table/admin-table.types';
import type { IAvgReport } from '../types/reports.types';

export const avgColumns: IAdminTableColumn<IAvgReport>[] = [
  {
    key: 'id',
    title: '#',
    width: 60,
    minWidth: 50,
    align: 'center',
    value: (report) => report.id,
  },
  {
    key: 'shopAddress',
    title: 'Адрес магазина',
    width: 260,
    minWidth: 180,
    maxLines: 2,
    value: (report) => report.shopAddress,
  },
  {
    key: 'averageOrderPrice',
    title: 'Средний чек',
    width: 160,
    minWidth: 130,
    align: 'right',
    value: (report) =>
      `${report.averageOrderPrice.toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} ₽`,
  },
];

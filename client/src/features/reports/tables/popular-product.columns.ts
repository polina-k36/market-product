import type { IAdminTableColumn } from '@/components/ui/table/admin-table.types';
import type { IPopularProductReport } from '../types/reports.types';

export const popularProductColumns: IAdminTableColumn<IPopularProductReport>[] =
  [
    {
      key: 'id',
      title: '#',
      width: 60,
      minWidth: 50,
      align: 'center',
      value: (report) => report.id,
    },
    {
      key: 'product',
      title: 'Товар',
      width: 240,
      minWidth: 160,
      maxLines: 2,
      value: (report) => report.product,
    },
    {
      key: 'soldQuantity',
      title: 'Продано',
      width: 140,
      minWidth: 110,
      align: 'right',
      value: (report) => report.soldQuantity,
    },
    {
      key: 'revenue',
      title: 'Выручка',
      width: 150,
      minWidth: 120,
      align: 'right',
      value: (report) =>
        `${report.revenue.toLocaleString('ru-RU', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} ₽`,
    },
  ];

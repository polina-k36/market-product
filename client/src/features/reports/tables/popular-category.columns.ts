import type { IAdminTableColumn } from '@/components/ui/table/admin-table.types';
import type { IPopularCategoryReport } from '../types/reports.types';

export const popularCategoryColumns: IAdminTableColumn<IPopularCategoryReport>[] =
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
      key: 'category',
      title: 'Категория',
      width: 220,
      minWidth: 160,
      maxLines: 2,
      value: (report) => report.category,
    },
    {
      key: 'quantity',
      title: 'Количество',
      width: 130,
      minWidth: 110,
      align: 'right',
      value: (report) =>
        report.quantity.toLocaleString('ru-RU', {
          maximumFractionDigits: 2,
        }),
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
    {
      key: 'salesShare',
      title: 'Доля продаж',
      width: 130,
      minWidth: 110,
      align: 'right',
      value: (report) => `${report.salesShare.toLocaleString('ru-RU')} %`,
    },
  ];

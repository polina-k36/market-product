import type { IAdminTableColumn } from '@/components/ui/table/admin-table.types';
import type { IAdminTableOrder } from '../types/order.types';
import { formatDateTime } from '@/utils/format-date.utils';

export const orderColumns: IAdminTableColumn<IAdminTableOrder>[] = [
  {
    key: 'id',
    title: '#',
    width: 65,
    minWidth: 50,
    align: 'center',
    value: (order) => order.id,
  },
  {
    key: 'date',
    title: 'Дата',
    width: 150,
    minWidth: 130,
    value: (order) => formatDateTime(order.date),
  },
  {
    key: 'user',
    title: 'Покупатель',
    width: 180,
    minWidth: 140,
    value: (order) => `${order.user.name} (ID: ${order.user.id})`,
  },
  {
    key: 'deliveryAddress',
    title: 'Адрес доставки',
    width: 220,
    minWidth: 160,
    maxLines: 2,
    value: (order) => {
      if (order.deliveryMethod !== 'Самовывоз') {
        return 'Самовывоз';
      }

      const address = [
        order.deliveryCity,
        order.deliveryStreet,
        order.deliveryHouse && `д. ${order.deliveryHouse}`,
        order.deliveryApartment && `кв. ${order.deliveryApartment}`,
      ].filter(Boolean);

      return address.length ? address.join(', ') : 'Не указан';
    },
  },
  {
    key: 'shop',
    title: 'Магазин',
    width: 180,
    minWidth: 140,
    maxLines: 2,
    value: (order) =>
      `#${order.shop.id} — ${order.shop.city}, ${order.shop.street}, ${order.shop.house}`,
  },
  {
    key: 'totalPrice',
    title: 'Сумма',
    width: 120,
    minWidth: 100,
    align: 'right',
    value: (order) =>
      order.totalPrice !== null
        ? `${Number(order.totalPrice).toLocaleString('ru-RU')} ₽`
        : '—',
  },
  {
    key: 'itemCount',
    title: 'Кол-во товаров',
    width: 120,
    minWidth: 100,
    align: 'center',
    value: (order) => order.itemCount,
  },
  {
    key: 'status',
    title: 'Статус',
    width: 150,
    minWidth: 120,
    value: (order) => order.status,
  },
];

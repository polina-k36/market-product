import type { IAdminTableColumn } from '@/components/ui/table/admin-table.types';
import type { IShopData } from '../types/shop.types';

export const shopColumns: IAdminTableColumn<IShopData>[] = [
  {
    key: 'id',
    title: '#',
    width: 60,
    minWidth: 50,
    align: 'center',
    value: (shop) => shop.id,
  },
  {
    key: 'shopCity',
    title: 'Город',
    width: 180,
    minWidth: 130,
    align: 'left',
    value: (shop) => shop.city,
  },
  {
    key: 'shopStreet',
    title: 'Улица',
    width: 240,
    minWidth: 160,
    align: 'left',
    value: (shop) => shop.street,
  },
  {
    key: 'shopHouse',
    title: 'Дом',
    width: 100,
    minWidth: 90,
    align: 'left',
    value: (shop) => shop.house,
  },
  {
    key: 'phone',
    title: 'Номер телефона',
    width: 110,
    minWidth: 90,
    align: 'left',
    value: (shop) => shop.phone,
  },
];

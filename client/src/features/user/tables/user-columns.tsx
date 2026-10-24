import type { IAdminTableColumn } from '@/components/ui/table/admin-table.types';
import type { IFullInfoUser } from '../types/user.types';

export const userColumns: IAdminTableColumn<IFullInfoUser>[] = [
  {
    key: 'id',
    title: '#',
    width: 60,
    minWidth: 50,
    align: 'center',
    value: (user) => user.id,
  },
  {
    key: 'name',
    title: 'Имя',
    width: 180,
    minWidth: 130,
    value: (user) => user.name,
  },
  {
    key: 'birthDate',
    title: 'Дата рождения',
    width: 140,
    minWidth: 120,
    value: (user) =>
      user.birthDate
        ? new Date(user.birthDate).toLocaleDateString('ru-RU')
        : '—',
  },
  {
    key: 'phone',
    title: 'Телефон',
    width: 150,
    minWidth: 130,
    value: (user) => user.phone ?? '—',
  },
  {
    key: 'email',
    title: 'Email',
    width: 220,
    minWidth: 170,
    value: (user) => user.email ?? '—',
  },
  {
    key: 'role',
    title: 'Роль',
    width: 120,
    minWidth: 100,
    value: (user) => user.role.title,
  },
  {
    key: 'emailVerified',
    title: 'Email подтверждён',
    width: 150,
    minWidth: 130,
    align: 'center',
    value: (user) => (user.emailVerified ? 'Да' : 'Нет'),
  },
  {
    key: 'addressesCount',
    title: 'Адреса',
    width: 85,
    minWidth: 70,
    align: 'center',
    value: (user) => user.addressesCount,
  },
  {
    key: 'cardsCount',
    title: 'Карты',
    width: 80,
    minWidth: 65,
    align: 'center',
    value: (user) => user.cardsCount,
  },
  {
    key: 'ordersCount',
    title: 'Заказы',
    width: 85,
    minWidth: 70,
    align: 'center',
    value: (user) => user.ordersCount,
  },
  {
    key: 'createdAt',
    title: 'Регистрация',
    width: 140,
    minWidth: 120,
    value: (user) =>
      user.createdAt
        ? new Date(user.createdAt).toLocaleDateString('ru-RU')
        : '—',
  },
  {
    key: 'isBanned',
    title: 'Заблокирован',
    width: 120,
    minWidth: 100,
    align: 'center',
    value: (user) => (user.isBanned ? 'Да' : 'Нет'),
  },
  {
    key: 'bannedAt',
    title: 'Дата блокировки',
    width: 150,
    minWidth: 130,
    value: (user) =>
      user.bannedAt ? new Date(user.bannedAt).toLocaleDateString('ru-RU') : '—',
  },
  {
    key: 'banReason',
    title: 'Причина блокировки',
    width: 200,
    minWidth: 180,
    value: (user) => user.banReason ?? '—',
  },
];

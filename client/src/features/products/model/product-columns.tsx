import type { IAdminTableColumn } from '@/components/ui/table/admin-table.types';
import type { IPromoProduct } from '../types/products.types';
import { env } from '@/config/env';

export const productColumns: IAdminTableColumn<IPromoProduct>[] = [
  {
    key: 'id',
    title: '#',
    width: 60,
    minWidth: 50,
    align: 'center',
    value: (product) => product.id,
  },
  {
    key: 'title',
    title: 'Наименование',
    width: 180,
    minWidth: 130,
    value: (product) => product.title,
  },
  {
    key: 'description',
    title: 'Описание',
    width: 240,
    minWidth: 160,
    maxLines: 3,
    value: (product) => product.description,
  },
  {
    key: 'composition',
    title: 'Состав',
    width: 220,
    minWidth: 150,
    maxLines: 3,
    value: (product) => product.composition,
  },
  {
    key: 'imageKey',
    title: 'Иконка',
    width: 100,
    minWidth: 90,
    align: 'left',
    searchable: false,
    render: (product) =>
      product.imageKey ? (
        <img
          src={`${env.s3Url}/${product.imageKey}`}
          alt={product.title}
          loading="lazy"
          className="h-12 w-12 rounded-lg border border-border object-cover"
        />
      ) : (
        <span className="text-text-muted">Нет фото</span>
      ),
  },
  {
    key: 'price',
    title: 'Цена',
    width: 110,
    minWidth: 90,
    align: 'left',
    value: (product) => Number(product.price),
  },
  {
    key: 'nds',
    title: 'НДС',
    width: 110,
    minWidth: 90,
    align: 'left',
    value: (product) => product.nds,
  },
  {
    key: 'category',
    title: 'Категория',
    width: 130,
    minWidth: 100,
    value: (product) => product.category,
  },
  {
    key: 'unit',
    title: 'Единица',
    width: 110,
    minWidth: 90,
    value: (product) => product.unit?.fullTitle,
  },
];

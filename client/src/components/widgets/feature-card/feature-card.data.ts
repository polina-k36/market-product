import { Clock, Shield, Tag, Truck } from 'lucide-react';
import type { IFeatureData } from './feature-card.types';

export const features: IFeatureData[] = [
  {
    id: 1,
    icon: Truck,
    colorIcon: 'blue',
    title: 'Доставка 2 часа',
    subtitle: 'Привезём заказ быстро',
  },
  {
    id: 2,
    icon: Shield,
    colorIcon: 'green',
    title: 'Свежие продукты',
    subtitle: 'Гарантия качества',
  },
  {
    id: 3,
    icon: Clock,
    colorIcon: 'purple',
    title: 'Работаем 24/7',
    subtitle: 'Круглосуточно',
  },
  {
    id: 4,
    icon: Tag,
    colorIcon: 'red',
    title: 'Скидки каждый день',
    subtitle: 'Акции и бонусы',
  },
];

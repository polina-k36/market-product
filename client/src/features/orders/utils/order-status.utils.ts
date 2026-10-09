import {
  CheckCircle,
  ClipboardList,
  PackageCheck,
  PackageOpen,
  RotateCcw,
  Store,
  Truck,
  XCircle,
  type LucideIcon,
} from 'lucide-react';
import type { OrderStatus } from '../types/order.types';

export function orderStatusConfig(status: OrderStatus): {
  key: OrderStatus;
  label: string;
  icon: LucideIcon;
} {
  switch (status) {
    case 'PROCESSING':
      return {
        key: 'PROCESSING',
        label: 'Обработка',
        icon: ClipboardList,
      };

    case 'CONFIRMED':
      return {
        key: 'CONFIRMED',
        label: 'Подтверждён',
        icon: CheckCircle,
      };

    case 'PREPARING':
      return {
        key: 'PREPARING',
        label: 'Сборка',
        icon: PackageOpen,
      };

    case 'SHIPPED':
      return {
        key: 'SHIPPED',
        label: 'Передан в доставку',
        icon: Truck,
      };

    case 'READY_FOR_PICKUP':
      return {
        key: 'READY_FOR_PICKUP',
        label: 'Готов к выдаче',
        icon: Store,
      };

    case 'DELIVERED':
      return {
        key: 'DELIVERED',
        label: 'Получен',
        icon: PackageCheck,
      };

    case 'CANCELLED':
      return {
        key: 'CANCELLED',
        label: 'Отменён',
        icon: XCircle,
      };

    case 'RETURNED':
      return {
        key: 'RETURNED',
        label: 'Возвращён',
        icon: RotateCcw,
      };
  }
}

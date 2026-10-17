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

interface OrderStatusConfig {
  key: OrderStatus;
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export function orderStatusConfig(status: OrderStatus): OrderStatusConfig {
  switch (status) {
    case 'PROCESSING':
      return {
        key: 'PROCESSING',
        label: 'Обработка',
        icon: ClipboardList,
        color: 'text-accent',
        bgColor: 'bg-accent/15',
      };

    case 'CONFIRMED':
      return {
        key: 'CONFIRMED',
        label: 'Подтверждён',
        icon: CheckCircle,
        color: 'text-primary',
        bgColor: 'bg-primary/15',
      };

    case 'PREPARING':
      return {
        key: 'PREPARING',
        label: 'Сборка',
        icon: PackageOpen,
        color: 'text-blue',
        bgColor: 'bg-blue/15',
      };

    case 'SHIPPED':
      return {
        key: 'SHIPPED',
        label: 'Передан в доставку',
        icon: Truck,
        color: 'text-primary',
        bgColor: 'bg-primary/15',
      };

    case 'READY_FOR_PICKUP':
      return {
        key: 'READY_FOR_PICKUP',
        label: 'Готов к выдаче',
        icon: Store,
        color: 'text-warning',
        bgColor: 'bg-warning/15',
      };

    case 'DELIVERED':
      return {
        key: 'DELIVERED',
        label: 'Получен',
        icon: PackageCheck,
        color: 'text-success',
        bgColor: 'bg-success/15',
      };

    case 'CANCELLED':
      return {
        key: 'CANCELLED',
        label: 'Отменён',
        icon: XCircle,
        color: 'text-danger',
        bgColor: 'bg-danger/15',
      };

    case 'RETURNED':
      return {
        key: 'RETURNED',
        label: 'Возвращён',
        icon: RotateCcw,
        color: 'text-accent',
        bgColor: 'bg-accent/15',
      };
  }
}

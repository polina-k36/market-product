import type { ReservationItemStatus } from './reservation.types';

export type ReservationNotificationKind =
  | 'fully-reserved'
  | 'partially-reserved'
  | 'not-reserved'
  | 'shop-changed'
  | 'existing';

export interface ReservationProduct {
  productId: number;
  product: string;
  status: ReservationItemStatus;
  reservedQuantity: number;
  requestedQuantity: number;
}

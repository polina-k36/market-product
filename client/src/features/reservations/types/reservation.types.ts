export interface ICreateData {
  shopId: number;
  items: ICreateReservationItem[];
}

interface ICreateReservationItem {
  productId: number;
  quantity: number;
}

export interface ICreateFromCartData {
  shopId: number;
}

export interface IChangeReservationItem {
  reservationId: number;
  productId: number;
  quantity?: number;
}

export interface ISetReservationItemQuantity {
  reservationId: number;
  productId: number;
  quantity: number;
}

export interface IReservation {
  reservationId: number | null;
  shopId: number;
  items: IReservationItem[];
}

interface IReservationItem {
  productId: number;
  requestedQuantity: number;
  reservedQuantity: number;
  status: ReservationItemStatus;
}

export interface IReservationItemProduct {
  id: number;
  reservationId: number;
  productId: number;
  quantity: number;
}

export interface ICompleteReservation {
  id: number;
  shopId: number;
}

export type ReservationItemStatus =
  'PARTIALLY_RESERVED' | 'RESERVED' | 'UNAVAILABLE';

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
  isNew?: boolean;
  reservationId: number | null;
  shopId: number;
  items: IReservationItem[];
}

export interface IReservationItem {
  product:
    | {
        id: number;
        title: string;
        description: string;
        imageKey: string;
        price: number;
        unit: string;
      }
    | undefined;
  requestedQuantity: number;
  reservedQuantity: number;
  status: ReservationItemStatus;
}

export interface IInfoReservation {
  expiresAt: Date;
  reservationId: number;
  shopId: number;
  items: {
    product: {
      unit: string;
      id: number;
      title: string;
      description: string;
      imageKey: string;
      price: string;
    };
    quantity: string;
  }[];
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

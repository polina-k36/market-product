export interface IOrder {
  id: number;
  date: Date;
  deliveryCity: string | null;
  deliveryStreet: string | null;
  deliveryHouse: string | null;
  deliveryApartment: string | null;
  totalPrice: string | null;
  status: OrderStatus;
  itemCount: number;
}

export type OrderStatus =
  | 'PROCESSING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURNED';

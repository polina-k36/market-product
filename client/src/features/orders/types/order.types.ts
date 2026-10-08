export interface IPromoOrder {
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

export interface IFullOrder {
  id: number;
  date: string;
  deliveryMethod: string;
  paymentMethod: string;
  status: OrderStatus;
  userCard: {
    cardLast4: string;
    cardBrand: string;
  } | null;
  deliveryCity: string | null;
  deliveryStreet: string | null;
  deliveryHouse: string | null;
  deliveryApartment: string | null;
  orderItems: IOrderItems[];
}

export interface IOrderItems {
  id: number;
  price: string;
  quantity: string;
  product: {
    title: string;
    description: string;
    imageKey: string;
    unit: {
      shortTitle: string;
    };
  };
}

export type OrderStatus =
  | 'PROCESSING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURNED';

export type DeliveryMethod = 'delivery' | 'pickup';
export type PaymentMethod = 'card' | 'courier';

export interface IPromoOrder {
  id: number;
  date: Date;
  deliveryCity: string | null;
  deliveryStreet: string | null;
  deliveryHouse: string | null;
  deliveryApartment: string | null;
  deliveryMethod: 'Курьерская доставка' | 'Самовывоз';
  totalPrice: string | null;
  status: OrderStatus;
  itemCount: number;
  shop: {
    city: string;
    street: string;
    house: string;
  };
}

export interface IFullOrder {
  id: number;
  date: Date;
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
  shop: {
    city: string;
    street: string;
    house: string;
  };
  orderItems: IOrderItems[];
}

export interface IOrderItems {
  id: number;
  price: string;
  quantity: string;
  product: {
    id: number;
    title: string;
    description: string;
    imageKey: string;
    unit: {
      shortTitle: string;
    };
  };
}
//TODO при создании заказа использовать резерв и именно из него брать продукты
export interface ICreateOrder {
  deliveryCity: string | null;
  deliveryStreet: string | null;
  deliveryHouse: string | null;
  deliveryApartment: string | null;
  shopId: number;
  paymentMethodId: number;
  deliveryMethodId: number;
  userCardId: number | null;
  reservationId: number;
}

export type OrderStatus =
  | 'PROCESSING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'SHIPPED'
  | 'READY_FOR_PICKUP'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURNED';

export type DeliveryMethod = 'delivery' | 'pickup';
export type PaymentMethod = 'card' | 'courier';

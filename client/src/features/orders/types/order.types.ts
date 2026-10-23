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
    id: number;
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
  invoices: IReturnedInvoice[];
}

export interface IReturnProduct {
  productId: number;
  quantity: number;
  price: number;
}

export interface IReturnedInvoice {
  date: Date;
  invoiceItems: {
    productId: number;
    quantity: number;
  }[];
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

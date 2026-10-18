import { api } from '@/api/axios';
import type {
  IChangeReservationItem,
  ICompleteReservation,
  ICreateData,
  ICreateFromCartData,
  IInfoReservation,
  IReservation,
  IReservationItemProduct,
  ISetReservationItemQuantity,
} from '../types/reservation.types';
import type { IResponse } from '@/types/api/api-response.type';

export const reservationApi = {
  getById: async (id: number): Promise<IInfoReservation> => {
    const { data } = await api.get<IResponse<IInfoReservation>>(
      `stock-reservations/${id}`,
    );
    return data.data;
  },

  getByUser: async (): Promise<IReservation | null> => {
    const { data } =
      await api.get<IResponse<IReservation | null>>(`stock-reservations`);
    return data.data;
  },

  create: async (payload: ICreateData): Promise<IReservation> => {
    const { data } = await api.post<IResponse<IReservation>>(
      'stock-reservations',
      payload,
    );
    return data.data;
  },

  createFromCart: async (
    payload: ICreateFromCartData,
  ): Promise<IReservation> => {
    const { data } = await api.post<IResponse<IReservation>>(
      'stock-reservations/from-cart',
      payload,
    );
    return data.data;
  },

  incrementItem: async ({
    reservationId,
    productId,
    quantity,
  }: IChangeReservationItem): Promise<IReservationItemProduct> => {
    const { data } = await api.patch<IResponse<IReservationItemProduct>>(
      `stock-reservations/${reservationId}/items/${productId}/increment`,
      { quantity },
    );
    return data.data;
  },

  decrementItem: async ({
    reservationId,
    productId,
    quantity,
  }: IChangeReservationItem): Promise<IReservationItemProduct> => {
    const { data } = await api.patch<IResponse<IReservationItemProduct>>(
      `stock-reservations/${reservationId}/items/${productId}/decrement`,
      { quantity },
    );
    return data.data;
  },

  setItemQuantity: async ({
    reservationId,
    productId,
    quantity,
  }: ISetReservationItemQuantity): Promise<IReservationItemProduct> => {
    const { data } = await api.patch<IResponse<IReservationItemProduct>>(
      `stock-reservations/${reservationId}/items/${productId}`,
      { quantity },
    );
    return data.data;
  },

  changeShop: async ({
    reservationId,
    shopId,
  }: {
    reservationId: number;
    shopId: number;
  }): Promise<IReservation> => {
    const { data } = await api.patch<IResponse<IReservation>>(
      `stock-reservations/${reservationId}/shop`,
      { shopId },
    );
    return data.data;
  },

  confirm: async (reservationId: number): Promise<ICompleteReservation> => {
    const { data } = await api.post<IResponse<ICompleteReservation>>(
      `stock-reservations/${reservationId}/confirm`,
    );
    return data.data;
  },

  cancel: async (reservationId: number): Promise<ICompleteReservation> => {
    const { data } = await api.post<IResponse<ICompleteReservation>>(
      `stock-reservations/${reservationId}/cancel`,
    );
    return data.data;
  },

  removeItem: async ({
    reservationId,
    productId,
  }: {
    reservationId: number;
    productId: number;
  }): Promise<IReservationItemProduct> => {
    const { data } = await api.delete<IResponse<IReservationItemProduct>>(
      `stock-reservations/${reservationId}/items/${productId}`,
    );
    return data.data;
  },
};

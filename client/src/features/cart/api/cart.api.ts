import { api } from '@/api/axios';
import type { ICartItem } from '../types/cart.types';
import type { IResponse } from '@/types/api/api-response.type';

export const cartApi = {
  getCartItem: async (): Promise<ICartItem[]> => {
    const { data } = await api.get<IResponse<ICartItem[]>>('carts/cart/items');
    return data.data;
  },
  addCartItem: async ({
    id,
    quantity,
  }: {
    id: number;
    quantity?: number;
  }): Promise<ICartItem> => {
    const { data } = await api.post<IResponse<ICartItem>>(
      `carts/cart/items/${id}`,
      {
        quantity,
      },
    );

    return data.data;
  },
  getCountItems: async (): Promise<number> => {
    const { data } = await api.get<IResponse<number>>('carts/cart/items/count');
    return data.data;
  },
  decrementCartItems: async ({
    id,
    quantity,
  }: {
    id: number;
    quantity?: number;
  }): Promise<ICartItem> => {
    const { data } = await api.patch<IResponse<ICartItem>>(
      `carts/cart/items/${id}/decrement`,
      {
        quantity,
      },
    );

    return data.data;
  },
  setCartItemQuantity: async ({
    id,
    quantity,
  }: {
    id: number;
    quantity: number;
  }): Promise<ICartItem> => {
    const { data } = await api.patch<IResponse<ICartItem>>(
      `carts/cart/items/${id}`,
      {
        quantity,
      },
    );

    return data.data;
  },
  removeCartItem: async (id: number): Promise<ICartItem> => {
    const { data } = await api.delete<IResponse<ICartItem>>(
      `carts/cart/items/${id}`,
    );

    return data.data;
  },
};

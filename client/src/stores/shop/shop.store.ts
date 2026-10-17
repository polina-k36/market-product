import { create } from 'zustand';
import type { IShopState } from './shop.types';

export const useShopStore = create<IShopState>((set) => ({
  shopId: 1, // TODO: цеплять активный магазин из последнего заказа пользователя

  setShopId: (id) => {
    set({ shopId: id });
  },
}));

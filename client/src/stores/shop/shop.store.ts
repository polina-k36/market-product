import { create } from 'zustand';
import type { IShopState } from './shop.types';

export const useShopStore = create<IShopState>((set) => ({
  shopId: 0,

  setShopId: (id) => {
    set({ shopId: id });
  },
}));

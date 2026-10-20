import { create } from 'zustand';
import type { IShopState } from './shop.types';

export const useShopStore = create<IShopState>((set) => ({
  shopId: 0,
  setShopId: (shopId: number) => set({ shopId }),
}));

import { create } from 'zustand';
import type { ICartState } from '../types/cart-store.types';

export const useCartStore = create<ICartState>((set) => ({
  isOpen: false,
  countItems: 0,
  openCart: () => {
    set({ isOpen: true });
  },
  closeCart: () => {
    set({ isOpen: false });
  },
  setCountItems: (quantity: number) => {
    set({ countItems: quantity });
  },
  incrementCountItems: () => {
    set((state) => ({
      countItems: state.countItems + 1,
    }));
  },
  decrementCountItems: () => {
    set((state) => {
      if (state.countItems > 1) {
        return {
          countItems: state.countItems - 1,
        };
      }
      return {};
    });
  },
}));

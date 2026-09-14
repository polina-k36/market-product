import { create } from 'zustand';

import type { IAuthState } from './auth.types';

export const useAuthStore = create<IAuthState>((set) => ({
  accessToken: null,
  user: null,

  setAccessToken: (accessToken) => {
    set({ accessToken });
  },

  setUser: (user) => {
    set({ user });
  },

  logout: () => {
    set({
      accessToken: null,
      user: null,
    });
  },
}));

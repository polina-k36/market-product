import { create } from 'zustand';

import type { IAuthState } from '../../types/auth/auth.types';

export const useAuthStore = create<IAuthState>((set) => ({
  accessToken: null,
  user: null,
  status: 'unknown',

  setAccessToken: (accessToken) => {
    set({ accessToken });
  },

  setUser: (user) => {
    set({ user });
  },

  setAuthStatus: (status) => {
    set({ status });
  },

  logout: () => {
    set({
      accessToken: null,
      user: null,
      status: 'unauthenticated',
    });
  },
}));

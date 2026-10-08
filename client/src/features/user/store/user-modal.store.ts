import { create } from 'zustand';
import type { IUserModalState } from '../types/user-modal.types';

export const useUserModalStore = create<IUserModalState>((set) => ({
  modal: null,
  openCreateAddressModal: () => {
    set({
      modal: { type: 'create-address' },
    });
  },
  openUpdateAddressModal: (addressId) => {
    set({
      modal: { type: 'update-address', addressId },
    });
  },
  openUserInfoModal: () => {
    set({
      modal: { type: 'user' },
    });
  },
  closeModal: () => {
    set({
      modal: null,
    });
  },
}));

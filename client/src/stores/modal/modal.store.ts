import type { IModalState } from '@/types/modal/modal.types';
import { create } from 'zustand';

export const useModalStore = create<IModalState>((set) => ({
  modal: null,

  openCreateAddressModal: () => {
    set({ modal: { type: 'create-address' } });
  },

  openUpdateAddressModal: (addressId) => {
    set({ modal: { type: 'update-address', addressId } });
  },

  openUserInfoModal: () => {
    set({ modal: { type: 'user' } });
  },

  openCreateProductModal: () => {
    set({ modal: { type: 'create-product' } });
  },

  openUpdateProductModal: (productId) => {
    set({ modal: { type: 'update-product', productId } });
  },

  openCreateShopModal: () => {
    set({ modal: { type: 'create-shop' } });
  },

  openUpdateShopModal: (shopId) => {
    set({ modal: { type: 'update-shop', shopId } });
  },

  openCreateCategoryModal: () => {
    set({ modal: { type: 'create-category' } });
  },

  openUpdateCategoryModal: (categoryId) => {
    set({ modal: { type: 'update-category', categoryId } });
  },

  openCreateSupplierModal: () => {
    set({ modal: { type: 'create-supplier' } });
  },

  openUpdateSupplierModal: (supplierId) => {
    set({ modal: { type: 'update-supplier', supplierId } });
  },

  closeModal: () => {
    set({ modal: null });
  },
}));

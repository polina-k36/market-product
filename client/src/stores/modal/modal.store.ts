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

  openCreatePaymentMethodModal: () => {
    set({ modal: { type: 'create-payment-method' } });
  },

  openUpdatePaymentMethodModal: (paymentMethodId) => {
    set({ modal: { type: 'update-payment-method', paymentMethodId } });
  },

  openCreateDeliveryMethodModal: () => {
    set({ modal: { type: 'create-delivery-method' } });
  },

  openUpdateDeliveryMethodModal: (deliveryMethodId) => {
    set({ modal: { type: 'update-delivery-method', deliveryMethodId } });
  },

  openCreateNdsModal: () => {
    set({ modal: { type: 'create-nds' } });
  },

  openUpdateNdsModal: (ndsId) => {
    set({ modal: { type: 'update-nds', ndsId } });
  },

  openCreateUnitModal: () => {
    set({ modal: { type: 'create-unit' } });
  },

  openUpdateUnitModal: (unitId) => {
    set({ modal: { type: 'update-unit', unitId } });
  },

  closeModal: () => {
    set({ modal: null });
  },
}));

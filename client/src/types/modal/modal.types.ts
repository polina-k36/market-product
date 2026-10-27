export type UserModal =
  | { type: 'create-address' }
  | { type: 'update-address'; addressId: number }
  | { type: 'user' };

export type ProductModal =
  { type: 'create-product' } | { type: 'update-product'; productId: number };

export type ShopModal =
  { type: 'create-shop' } | { type: 'update-shop'; shopId: number };

export type ModalState = UserModal | ProductModal | ShopModal | null;

export interface IModalState {
  modal: ModalState;
  openCreateAddressModal: () => void;
  openUpdateAddressModal: (addressId: number) => void;
  openUserInfoModal: () => void;
  openCreateProductModal: () => void;
  openUpdateProductModal: (productId: number) => void;
  openCreateShopModal: () => void;
  openUpdateShopModal: (shopId: number) => void;
  closeModal: () => void;
}

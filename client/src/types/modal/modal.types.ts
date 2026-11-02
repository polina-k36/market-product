export type UserModal =
  | { type: 'create-address' }
  | { type: 'update-address'; addressId: number }
  | { type: 'user' };

export type ProductModal =
  { type: 'create-product' } | { type: 'update-product'; productId: number };

export type ShopModal =
  { type: 'create-shop' } | { type: 'update-shop'; shopId: number };

export type CategoryModal =
  { type: 'create-category' } | { type: 'update-category'; categoryId: number };

export type SupplierModal =
  { type: 'create-supplier' } | { type: 'update-supplier'; supplierId: number };

export type PaymentMethodModal =
  | { type: 'create-payment-method' }
  | { type: 'update-payment-method'; paymentMethodId: number };

export type DeliveryMethodModal =
  | { type: 'create-delivery-method' }
  | { type: 'update-delivery-method'; deliveryMethodId: number };

export type NdsModal =
  { type: 'create-nds' } | { type: 'update-nds'; ndsId: number };

export type UnitModal =
  { type: 'create-unit' } | { type: 'update-unit'; unitId: number };

export type ModalState =
  | UserModal
  | ProductModal
  | ShopModal
  | CategoryModal
  | SupplierModal
  | PaymentMethodModal
  | DeliveryMethodModal
  | NdsModal
  | UnitModal
  | null;

export interface IModalState {
  modal: ModalState;

  openCreateAddressModal: () => void;
  openUpdateAddressModal: (addressId: number) => void;

  openUserInfoModal: () => void;

  openCreateProductModal: () => void;
  openUpdateProductModal: (productId: number) => void;

  openCreateShopModal: () => void;
  openUpdateShopModal: (shopId: number) => void;

  openCreateCategoryModal: () => void;
  openUpdateCategoryModal: (categoryId: number) => void;

  openCreateSupplierModal: () => void;
  openUpdateSupplierModal: (supplierId: number) => void;

  openCreatePaymentMethodModal: () => void;
  openUpdatePaymentMethodModal: (paymentMethodId: number) => void;

  openCreateDeliveryMethodModal: () => void;
  openUpdateDeliveryMethodModal: (deliveryMethodId: number) => void;

  openCreateNdsModal: () => void;
  openUpdateNdsModal: (ndsId: number) => void;

  openCreateUnitModal: () => void;
  openUpdateUnitModal: (unitId: number) => void;

  closeModal: () => void;
}

export type UserModal =
  | { type: 'create-address' }
  | { type: 'update-address'; addressId: number }
  | { type: 'user' }
  | null;

export interface IUserModalState {
  modal: UserModal;
  openCreateAddressModal: () => void;
  openUpdateAddressModal: (addressId: number) => void;
  openUserInfoModal: () => void;
  closeModal: () => void;
}

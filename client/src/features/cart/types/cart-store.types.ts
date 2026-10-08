export interface ICartState {
  isOpen: boolean;
  countItems: number;
  closeCart: () => void;
  openCart: () => void;
  setCountItems: (quantity: number) => void;
  incrementCountItems: () => void;
  decrementCountItems: () => void;
}

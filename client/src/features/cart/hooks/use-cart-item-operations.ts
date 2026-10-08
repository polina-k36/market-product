import { useAddCartItem } from './use-add-cart-item';
import { useRemoveCartItem } from './use-remove-cart-item';
import { useDecrementCartItem } from './use-decrement-cart-item';
import { useSetCartItemQuantity } from './use-set-cart-item-quantity';

export function useCartItemOperations(productId: number, cartQuantity: number) {
  const { mutate: addCartItem } = useAddCartItem();
  const { mutate: removeCartItem } = useRemoveCartItem();
  const { mutate: decrementCartItem } = useDecrementCartItem();
  const { mutate: setCartItemQuantity } = useSetCartItemQuantity();

  const add = (quantity?: number) => {
    addCartItem({ id: productId, quantity });
  };
  const increment = (quantity?: number) => {
    addCartItem({ id: productId, quantity });
  };
  const decrement = (quantity?: number) => {
    const decrementQuantity = quantity ?? 1;
    if (cartQuantity - decrementQuantity === 0) {
      removeCartItem(productId);
      return;
    }
    decrementCartItem({ id: productId, quantity: decrementQuantity });
  };
  const setQuantity = (quantity: number) => {
    setCartItemQuantity({
      id: productId,
      quantity,
    });
  };
  const remove = () => {
    removeCartItem(productId);
  };

  return {
    add,
    increment,
    decrement,
    setQuantity,
    remove,
  };
}

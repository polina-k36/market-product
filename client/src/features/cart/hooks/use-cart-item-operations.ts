import { useAddCartItem } from './use-add-cart-item';
import { useRemoveCartItem } from './use-remove-cart-item';
import { useDecrementCartItem } from './use-decrement-cart-item';
import { useSetCartItemQuantity } from './use-set-cart-item-quantity';
import { useNotificationStore } from '@/stores/notification/notification.store';

export function useCartItemOperations(productId: number, cartQuantity: number) {
  const { mutate: addCartItem } = useAddCartItem();
  const { mutate: removeCartItem } = useRemoveCartItem();
  const { mutate: decrementCartItem } = useDecrementCartItem();
  const { mutate: setCartItemQuantity } = useSetCartItemQuantity();
  const { addNotification } = useNotificationStore();

  const add = (quantity?: number) => {
    addCartItem(
      { id: productId, quantity },
      {
        onSuccess: () => {
          addNotification({
            type: 'success',
            title: 'Товар добавлен',
            description: 'Товар успешно добавлен в корзину',
            duration: 3000,
          });
        },
        onError: () => {
          addNotification({
            type: 'error',
            title: 'Ошибка добавления товара',
            description: 'Товар не может быть добавлен в корзину',
            duration: 3000,
          });
        },
      },
    );
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

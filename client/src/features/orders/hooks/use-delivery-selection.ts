import { useState } from 'react';
import { useDeliveryMethod } from './use-delivery-method';
import { useAddresses } from '@/features/addresses/hooks/use-addresses';
import { useShopStore } from '@/stores/shop/shop.store';

export function useDeliverySelection() {
  const { data: addresses, isLoading } = useAddresses();
  const activeShopId = useShopStore((state) => state.shopId);
  const { method: deliveryMethod } = useDeliveryMethod();

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );

  const getDeliveryValues = () => {
    if (isLoading) return;
    if (!activeShopId) {
      return {
        success: false,
        data: null,
        error: 'Нужно выбрать магазин для оформления заказа',
      };
    }

    if (deliveryMethod === 'delivery') {
      if (selectedAddressId === null) {
        return {
          success: false,
          data: null,
          error: 'Нужно выбрать адрес доставки',
        };
      }
      const activeAddress = addresses?.find(
        (address) => address.id === selectedAddressId,
      );
      if (!activeAddress)
        return {
          success: false,
          data: null,
          error: 'Не найден адрес доставки',
        };
      return {
        success: true,
        data: {
          deliveryCity: activeAddress.city,
          deliveryStreet: activeAddress.street,
          deliveryHouse: activeAddress.house,
          deliveryApartment: activeAddress.apartment,
          shopId: activeShopId,
          deliveryMethodId: 2,
        },
        error: null,
      };
    } else if (deliveryMethod === 'pickup') {
      return {
        success: true,
        data: {
          deliveryCity: null,
          deliveryStreet: null,
          deliveryHouse: null,
          deliveryApartment: null,
          shopId: activeShopId,
          deliveryMethodId: 1,
        },
        error: null,
      };
    }

    return {
      success: false,
      data: null,
      error: 'Неизвестная ошибка',
    };
  };
  return {
    selectedAddressId,
    setSelectedAddressId,
    getDeliveryValues,
    isLoadingAddresses: isLoading,
  };
}

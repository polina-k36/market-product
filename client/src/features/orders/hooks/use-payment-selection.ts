import { useState } from 'react';
import { usePaymentMethod } from './use-payment-method';
import { useUserCards } from '@/features/cards/hooks/use-user-cards';

export function usePaymentSelection() {
  const { method: paymentMethod } = usePaymentMethod();
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const { data: cards, isLoading } = useUserCards();
  const getPaymentValues = () => {
    if (isLoading) return;

    if (paymentMethod === 'card') {
      if (selectedCardId === null) {
        return {
          success: false,
          data: null,
          error: 'Нужно выбрать карту для оплаты',
        };
      }
      const activeCard = cards?.find((card) => card.id === selectedCardId);
      if (!activeCard)
        return {
          success: false,
          data: null,
          error: 'Не найдена карта для оплаты',
        };
      return {
        success: true,
        data: {
          paymentMethodId: 3,
          userCardId: activeCard.id,
        },
        error: null,
      };
    } else if (paymentMethod === 'courier') {
      return {
        success: true,
        data: {
          paymentMethodId: 1, //FIXME: разделение на оплату по карте или наличкой 1 Наличными при получении 2 Картой при получении
          userCardId: null,
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
    selectedCardId,
    setSelectedCardId,
    getPaymentValues,
    isLoadingCards: isLoading,
  };
}

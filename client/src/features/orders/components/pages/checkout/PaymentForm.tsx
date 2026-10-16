import { useState } from 'react';

import PaymentCardForm from '@/features/cards/components/PaymentCardForm';
import type { PaymentMethod } from '@/features/orders/types/order.types';
import { Banknote, Check, CreditCard, Plus } from 'lucide-react';
import { useUserCards } from '@/features/cards/hooks/use-user-cards';
import { usePaymentMethod } from '@/features/orders/hooks/use-payment-method';
import Button from '@/components/ui/buttons/Button';

interface IPaymentFormProps {
  selectedCardId: number | null;
  setSelectedCardId: (id: number | null) => void;
}

const PaymentForm = ({
  selectedCardId,
  setSelectedCardId,
}: IPaymentFormProps) => {
  const { data: cards } = useUserCards(); // TODO: загрузка и ошибка карт

  const { method: paymentMethod, setMethod: setPaymentMethod } =
    usePaymentMethod();
  const [isAddingCard, setIsAddingCard] = useState(false);

  const handleSelectCard = (cardId: number) => {
    setSelectedCardId(cardId);
    setIsAddingCard(false);
  };

  const handleAddNewCard = () => {
    setSelectedCardId(null);
    setIsAddingCard(true);
  };

  return (
    <div className="rounded-2xl bg-surface p-4 shadow-sm sm:p-6">
      <h2 className="mb-5 flex items-center gap-2 text-[1.1rem] font-bold text-text-primary">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
          3
        </span>
        <CreditCard className="h-5 w-5 text-primary" />
        Способ оплаты
      </h2>

      <div className="grid gap-3 sm:grid-cols-2">
        {[
          {
            method: 'card',
            name: 'Онлайн картой',
            description: 'Оплата банковской картой при оформлении заказа',
          },
          {
            method: 'courier',
            name: 'Оплата курьеру',
            description: 'Оплатите заказ при получении',
          },
        ].map((tab) => (
          <label
            key={tab.method}
            className={`relative cursor-pointer rounded-xl border p-4 transition-all ${
              paymentMethod === tab.method
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-border bg-surface hover:border-primary/40'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === tab.method}
              onChange={() => setPaymentMethod(tab.method as PaymentMethod)}
              className="sr-only"
            />

            <div className="flex items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  paymentMethod === tab.method
                    ? 'bg-primary text-white'
                    : 'bg-primary/10 text-primary'
                }`}
              >
                <CreditCard className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-text-primary">{tab.name}</p>

                  {paymentMethod === tab.method && (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm leading-5 text-text-secondary">
                  {tab.description}
                </p>
              </div>
            </div>
          </label>
        ))}
      </div>

      {paymentMethod === 'card' && (
        <div className="mt-5">
          <p className="mb-2.5 text-xs font-medium text-text-secondary">
            Выберите карту
          </p>

          <div className="flex flex-wrap gap-2">
            {cards &&
              cards.map((card) => {
                const isSelected = selectedCardId === card.id && !isAddingCard;

                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => handleSelectCard(card.id)}
                    className={`flex min-w-32.5 cursor-pointer items-start gap-3 rounded-lg border px-2.5 py-2 text-left transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-border bg-surface hover:border-primary/40 hover:bg-primary/5'
                    }`}
                  >
                    <div className="flex flex-1 items-center justify-start gap-2">
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                          isSelected
                            ? 'bg-primary text-white'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        <CreditCard className="h-3.5 w-3.5" />
                      </span>

                      <span className="min-w-0">
                        <span className="block text-xs font-medium text-text-primary uppercase">
                          {card.cardBrand}
                        </span>

                        <span className="block text-[11px] text-text-muted">
                          •••• {card.cardLast4}
                        </span>
                      </span>
                    </div>

                    {isSelected && (
                      <span className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                    )}
                  </button>
                );
              })}

            <button
              type="button"
              onClick={handleAddNewCard}
              className={`flex min-w-32.5 cursor-pointer items-start gap-3 rounded-lg border px-2.5 py-2 text-left transition-all ${
                isAddingCard
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border bg-surface hover:border-primary/40 hover:bg-primary/5'
              }`}
            >
              <div className="flex h-full flex-1 items-center justify-start gap-2">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                    isAddingCard
                      ? 'bg-primary text-white'
                      : 'bg-primary/10 text-primary'
                  }`}
                >
                  <Plus className="h-3.5 w-3.5" />
                </span>

                <span className="text-xs font-medium text-text-primary">
                  Новая карта
                </span>
              </div>

              {isAddingCard && (
                <span className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <Check className="h-2.5 w-2.5" />
                </span>
              )}
            </button>
          </div>

          {isAddingCard && (
            <div className="mt-4">
              <PaymentCardForm
                onSubmitForm={(data) => {
                  setIsAddingCard(false);
                  setSelectedCardId(data.id);
                }}
              />
              <Button
                variant="primary"
                type="submit"
                form="user-card-form"
                className="mt-4 w-full"
              >
                Добавить карту
              </Button>
            </div>
          )}
        </div>
      )}
      {paymentMethod === 'courier' && (
        <div className="mt-4 rounded-xl bg-background p-3.5">
          <div className="flex gap-3">
            <div className="mt-0.5 shrink-0 text-primary">
              <Banknote className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-medium text-text-primary">
                Оплата при получении
              </p>

              <p className="mt-0.5 text-xs leading-5 text-text-secondary">
                Оплатите заказ курьеру при доставке. Способ оплаты зависит от
                доступных вариантов у курьера.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;

import { Check, Minus, Plus } from 'lucide-react';
import { useState } from 'react';

interface ICartItemQuantityControlProps {
  quantity: number;
  unit: string;
  onIncrement: (quantity?: number) => void;
  onDecrement: (quantity?: number) => void;
  onSetQuantity: (quantity: number) => void;
}

const CartItemQuantityControl = ({
  quantity,
  unit,
  onIncrement,
  onDecrement,
  onSetQuantity,
}: ICartItemQuantityControlProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(String(quantity));

  const startEditing = () => {
    setValue(String(quantity));
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setValue(String(quantity));
    setIsEditing(false);
  };

  const applyQuantity = () => {
    const newQuantity = Number(value);
    if (!Number.isFinite(newQuantity) || newQuantity <= 0) {
      cancelEditing();
      return;
    }
    if (newQuantity !== quantity) {
      onSetQuantity(newQuantity);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      applyQuantity();
    }
    if (event.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <div
      className="mt-3 flex w-fit items-center gap-1 rounded-xl border border-border bg-surface-muted/50 p-1"
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <button
        type="button"
        aria-label="Уменьшить количество"
        onClick={() =>
          onDecrement(unit === 'шт' ? 1 : unit === 'л' ? 0.5 : 0.2)
        }
        className="flex size-7 items-center justify-center rounded-lg text-text-secondary transition-colors duration-200 hover:bg-danger/10 hover:text-danger focus:ring-2 focus:ring-danger/30 focus:outline-none"
      >
        <Minus className="size-3.5" />
      </button>
      {isEditing ? (
        <>
          <input
            autoFocus
            type="number"
            min="0"
            step={unit === 'шт' ? '1' : unit === 'л' ? '0.5' : '0.2'}
            value={value}
            onChange={(e) => {
              const value = e.target.value;
              if (unit === 'шт') {
                setValue(value === '' ? '0' : `${Math.round(Number(value))}`);
              } else {
                setValue(value);
              }
            }}
            onKeyDown={handleKeyDown}
            className="h-7 w-14 rounded-lg border border-border bg-surface px-1 text-center text-sm font-semibold text-text-primary outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="button"
            aria-label="Сохранить количество"
            onClick={applyQuantity}
            className="flex size-7 items-center justify-center rounded-lg text-primary transition-colors duration-200 hover:bg-primary/10 focus:ring-2 focus:ring-primary/30 focus:outline-none"
          >
            <Check className="size-3.5" />
          </button>
        </>
      ) : (
        <button
          type="button"
          aria-label={`Изменить количество, сейчас ${quantity}`}
          onClick={startEditing}
          className="flex min-w-9 items-center justify-center rounded-lg px-1.5 py-1 text-sm font-semibold text-text-primary transition-colors duration-200 hover:bg-surface hover:text-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
        >
          {quantity}
        </button>
      )}
      <button
        type="button"
        aria-label="Увеличить количество"
        onClick={() =>
          onIncrement(unit === 'шт' ? 1 : unit === 'л' ? 0.5 : 0.2)
        }
        className="flex size-7 items-center justify-center rounded-lg text-text-secondary transition-colors duration-200 hover:bg-primary/10 hover:text-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
};
export default CartItemQuantityControl;

import { useMemo, useState } from 'react';
import { CalendarDays, Check, RotateCcw, ShoppingBag } from 'lucide-react';
import type {
  IOrderItems,
  IReturnedInvoice,
  IReturnProduct,
} from '../../../types/order.types';
import { env } from '@/config/env';
import Button from '@/components/ui/buttons/Button';
import ProductQuantityControl from '@/components/ui/controls/ProductQuantityControl';
import { formatDateTime } from '@/utils/format-date.utils';
import { useReturnProducts } from '@/features/orders/hooks/use-return-products';
import { useNotificationStore } from '@/stores/notification/notification.store';

interface IOrderItemsProps {
  orderId: number;
  items: IOrderItems[];
  invoices: IReturnedInvoice[];
  returnLogic: boolean;
}

const OrderItems = ({
  orderId,
  items,
  invoices,
  returnLogic,
}: IOrderItemsProps) => {
  const [returnSelections, setReturnSelections] = useState<Map<number, number>>(
    () => new Map(),
  );

  const { mutate: returnProducts } = useReturnProducts();
  const { addNotification } = useNotificationStore();

  const returnedItems = useMemo(() => {
    const result = new Map<number, { quantity: number; dates: Date[] }>();

    invoices.forEach((invoice) => {
      invoice.invoiceItems.forEach((invoiceItem) => {
        const current = result.get(invoiceItem.productId) ?? {
          quantity: 0,
          dates: [],
        };

        current.quantity += Number(invoiceItem.quantity);
        current.dates.push(new Date(invoice.date));

        result.set(invoiceItem.productId, current);
      });
    });

    return result;
  }, [invoices]);

  const updateReturnQuantity = (
    productId: number,
    quantity: number,
    maxQuantity: number,
  ) => {
    setReturnSelections((previous) => {
      const next = new Map(previous);

      if (quantity <= 0) {
        next.delete(productId);
      } else {
        next.set(productId, Math.min(quantity, maxQuantity));
      }

      return next;
    });
  };

  const handleReturnSubmit = () => {
    const selectedItems: IReturnProduct[] = Array.from(
      returnSelections,
      ([productId, quantity]) => {
        const item = items.find((item) => item.product.id === productId);
        return { productId, quantity, price: Number(item?.price) };
      },
    );

    if (selectedItems.length === 0) return;

    returnProducts(
      {
        id: orderId,
        products: selectedItems,
      },
      {
        onSuccess: () => {
          addNotification({
            type: 'success',
            title: 'Возврат успешно оформлен',
            duration: 3000,
          });
          setReturnSelections(new Map());
        },
        onError: () => {
          addNotification({
            type: 'error',
            title: 'Возврат не удался',
            duration: 3000,
          });
        },
      },
    );
  };

  const selectedCount = Array.from(returnSelections.values()).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );

  return (
    <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
          <ShoppingBag className="size-4" aria-hidden="true" />
        </div>

        <div>
          <h2 className="text-base font-bold text-text-primary">Товары</h2>
          <p className="text-xs text-text-muted">
            {items.length}{' '}
            {items.length === 1
              ? 'позиция'
              : items.length < 5
                ? 'позиции'
                : 'позиций'}
          </p>
        </div>
      </div>

      <div className="divide-y divide-border">
        {items.map((item) => {
          const productId = item.product.id;
          const returned = returnedItems.get(productId);
          const returnedQuantity = returned?.quantity ?? 0;
          const orderedQuantity = Number(item.quantity);
          const availableQuantity = Math.max(
            0,
            orderedQuantity - returnedQuantity,
          );
          const selectedQuantity = returnSelections.get(productId) ?? 0;
          const isSelected = selectedQuantity > 0;

          return (
            <div key={item.id} className="py-4 first:pt-0 last:pb-0">
              <div
                className={`flex gap-3 rounded-xl p-3 transition-colors ${
                  isSelected ? 'bg-primary/5' : ''
                }`}
              >
                <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-surface-muted">
                  <img
                    src={`${env.s3Url}/${item.product.imageKey}`}
                    alt={item.product.title}
                    className="size-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-text-primary">
                    {item.product.title}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-xs text-text-muted">
                    {item.product.description}
                  </p>

                  <p className="mt-2 text-xs text-text-secondary">
                    {item.quantity} {item.product.unit.shortTitle}. ×{' '}
                    {item.price} ₽
                  </p>
                  {returnLogic && (
                    <>
                      {returned && returnedQuantity > 0 && (
                        <div className="mt-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                          <div className="flex items-center gap-2">
                            <RotateCcw
                              className="size-4 shrink-0 text-amber-600"
                              aria-hidden="true"
                            />
                            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                              Возврат оформлен
                            </p>
                          </div>

                          <p className="mt-1.5 text-xs text-text-secondary">
                            Возвращено: {returnedQuantity}{' '}
                            {item.product.unit.shortTitle}.
                          </p>

                          <div className="mt-2 space-y-1">
                            {returned.dates.map((date, index) => (
                              <div
                                key={`${date.getTime()}-${index}`}
                                className="flex items-center gap-1.5 text-xs text-text-muted"
                              >
                                <CalendarDays
                                  className="size-3.5 shrink-0"
                                  aria-hidden="true"
                                />
                                <span>Дата: {formatDateTime(date)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {availableQuantity > 0 && (
                        <div className="mt-3">
                          {!isSelected ? (
                            <button
                              type="button"
                              onClick={() =>
                                updateReturnQuantity(
                                  productId,
                                  1,
                                  availableQuantity,
                                )
                              }
                              className="inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                            >
                              <RotateCcw
                                className="size-3.5"
                                aria-hidden="true"
                              />
                              Выбрать для возврата
                            </button>
                          ) : (
                            <div className="flex flex-wrap items-center gap-3">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-medium text-text-primary">
                                  Вернуть:
                                </span>

                                <ProductQuantityControl
                                  quantity={selectedQuantity}
                                  maxQuantity={availableQuantity}
                                  unit={item.product.unit.shortTitle}
                                  onIncrement={(quantity) =>
                                    updateReturnQuantity(
                                      productId,
                                      selectedQuantity + (quantity ?? 1),
                                      availableQuantity,
                                    )
                                  }
                                  onDecrement={(quantity) =>
                                    updateReturnQuantity(
                                      productId,
                                      selectedQuantity - (quantity ?? 1),
                                      availableQuantity,
                                    )
                                  }
                                  onSetQuantity={(quantity) =>
                                    updateReturnQuantity(
                                      productId,
                                      quantity,
                                      availableQuantity,
                                    )
                                  }
                                />
                                <span className="text-xs text-text-muted">
                                  из {availableQuantity}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  updateReturnQuantity(
                                    productId,
                                    0,
                                    availableQuantity,
                                  )
                                }
                                className="cursor-pointer text-xs text-text-muted underline-offset-4 hover:text-danger hover:underline"
                              >
                                Отменить
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {returnLogic &&
                        availableQuantity === 0 &&
                        orderedQuantity > 0 && (
                          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-text-muted">
                            <Check className="size-3.5 text-emerald-600" />
                            Товар полностью возвращён
                          </p>
                        )}
                    </>
                  )}
                </div>

                <p className="shrink-0 text-sm font-bold text-text-primary">
                  {(orderedQuantity * Number(item.price)).toFixed(2)} ₽
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {returnLogic && selectedCount > 0 && (
        <div className="mt-5 border-t border-border pt-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm text-text-secondary">Выбрано для возврата</p>
            <p className="text-sm font-semibold text-text-primary">
              {selectedCount}{' '}
              {selectedCount === 1
                ? 'единица'
                : selectedCount < 5
                  ? 'единицы'
                  : 'единиц'}
            </p>
          </div>
          <Button
            type="button"
            variant="primary"
            className="group w-full"
            onClick={handleReturnSubmit}
          >
            <RotateCcw
              className="size-4 transition-transform duration-300 group-hover:-rotate-360"
              aria-hidden="true"
            />
            Продолжить возврат
          </Button>

          <p className="mt-2 text-center text-xs text-text-muted">
            Вы сможете проверить выбранные товары перед подтверждением.
          </p>
        </div>
      )}
    </section>
  );
};

export default OrderItems;

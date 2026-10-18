import { CircleX, TriangleAlert } from 'lucide-react';
import type { ReservationProduct } from '../../types/reservation-notifications.types';

interface ReservationProductListProps {
  products: ReservationProduct[];
}

const ReservationProductList = ({ products }: ReservationProductListProps) => {
  if (products.length === 0) return null;

  return (
    <div className="mt-3 max-h-38 custom-scrollbar space-y-2 overflow-y-auto pr-1">
      {products.map((product) => {
        const unavailable = product.status === 'UNAVAILABLE';

        return (
          <div
            key={product.productId}
            className={`flex items-start gap-3 rounded-lg border p-3 ${
              unavailable
                ? 'border-red-200 bg-red-50/70'
                : 'border-amber-200 bg-amber-50/70'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {unavailable ? (
                <CircleX className="h-5 w-5 text-red-500" aria-hidden="true" />
              ) : (
                <TriangleAlert
                  className="h-5 w-5 text-amber-500"
                  aria-hidden="true"
                />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold wrap-break-word text-text-primary">
                {product.product}
              </p>

              <p
                className={`mt-1 text-xs leading-relaxed ${
                  unavailable ? 'text-red-700' : 'text-amber-800'
                }`}
              >
                {unavailable
                  ? 'Не удалось зарезервировать'
                  : `Доступно ${product.reservedQuantity} из ${product.requestedQuantity} шт.`}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReservationProductList;

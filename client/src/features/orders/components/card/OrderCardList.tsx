import { Package } from 'lucide-react';
import { useOrders } from '../../hooks/use-orders';
import OrderCard from './OrderCard';

const OrderCardList = () => {
  const { data: orders } = useOrders();
  return (
    <>
      <h2 className="mb-6 text-xl font-bold text-text-primary">
        История заказов
      </h2>

      {orders && orders.length === 0 ? (
        <div className="rounded-2xl bg-surface p-12 text-center shadow-sm">
          <Package className="mx-auto mb-3 h-12 w-12 text-text-secondary" />
          <p className="text-text-primary">У вас пока нет заказов</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders &&
            orders.map((order) => (
              <OrderCard
                order={{
                  id: order.id,
                  date: `${order.date}`,
                  status: order.status,
                  delAddress: `${order.deliveryCity} ${order.deliveryStreet} д. ${order.deliveryHouse} кв. ${order.deliveryApartment}`,
                  itemCount: order.itemCount,
                  total: Number(order.totalPrice),
                }}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default OrderCardList;

import { Package } from 'lucide-react';
import { useOrders } from '../../hooks/use-orders';
import OrderCard from './OrderCard';

const statusOrder: Record<string, number> = {
  PROCESSING: 1,
  CONFIRMED: 2,
  PREPARING: 3,
  SHIPPED: 4,
  READY_FOR_PICKUP: 5,
  DELIVERED: 6,
  CANCELLED: 7,
  RETURNED: 8,
};

const OrderCardList = () => {
  const { data: orders } = useOrders();

  const sortedOrders = orders
    ? orders.sort(
        (orderA, orderB) =>
          (statusOrder[orderA.status] ?? 999) -
            (statusOrder[orderB.status] ?? 999) ||
          new Date(orderB.date).getTime() - new Date(orderA.date).getTime(),
      )
    : undefined;
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
          {sortedOrders &&
            sortedOrders.map((order) => (
              <OrderCard
                order={{
                  id: order.id,
                  date: order.date,
                  status: order.status,
                  delAddress: order.deliveryCity
                    ? `${order.deliveryCity} ${order.deliveryStreet} д. ${order.deliveryHouse} кв. ${order.deliveryApartment}`
                    : null,
                  itemCount: order.itemCount,
                  total: Number(order.totalPrice),
                  delMethod: order.deliveryMethod,
                  shopAddress: `${order.shop.city} ${order.shop.street} д. ${order.shop.house}`,
                }}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default OrderCardList;

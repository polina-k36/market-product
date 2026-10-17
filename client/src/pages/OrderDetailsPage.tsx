import OrderLayout from '@/components/layout/order/OrderLayout';
import DeliveryInfo from '@/features/orders/components/pages/info/DeliveryInfo';
import OrderHeader from '@/features/orders/components/pages/info/OrderHeader';
import OrderItems from '@/features/orders/components/pages/OrderItems';
import OrderSummary from '@/features/orders/components/pages/info/OrderSummary';
import PaymentInfo from '@/features/orders/components/pages/info/PaymentInfo';
import { useOrder } from '@/features/orders/hooks/use-order';
import { useParams } from 'react-router';

const OrderDetailsPage = () => {
  const params = useParams();
  const { data: order } = useOrder(Number(params.id));

  const itemsTotal = order
    ? order.orderItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0,
      )
    : 0;

  const deliveryPrice = 0;
  const total = itemsTotal;
  console.log(order?.orderItems);

  return (
    <>
      {Number.isInteger(Number(params.id)) && order && (
        <OrderLayout
          header={
            <OrderHeader
              id={order.id}
              date={order.date}
              status={order.status}
            />
          }
          aside={
            <OrderSummary
              orderId={order.id}
              status={order.status}
              itemsTotal={itemsTotal}
              delivery={deliveryPrice}
              total={total}
              items={order.orderItems.map((item) => ({
                productId: item.product.id,
                quantity: Number(item.quantity),
              }))}
            />
          }
        >
          <OrderItems items={order.orderItems} />

          <DeliveryInfo
            address={
              order.deliveryMethod === 'Самовывоз'
                ? `${order.shop.city} ${order.shop.street} д. ${order.shop.house}`
                : `${order.deliveryCity ?? ''} ${order.deliveryStreet ?? ''} ${order.deliveryHouse ? 'д. ' + order.deliveryHouse : ''} ${order.deliveryApartment ? 'кв. ' + order.deliveryApartment : ''}`
            }
            method={order.deliveryMethod}
          />

          <PaymentInfo
            status={order.status}
            card={order.userCard}
            total={total}
            method={order.paymentMethod}
          />
        </OrderLayout>
      )}
    </>
  );
};

export default OrderDetailsPage;

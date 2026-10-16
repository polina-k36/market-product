import InfoList from '@/features/orders/components/pages/success/InfoList';
import SuccessMainCard from '@/features/orders/components/pages/success/SuccessMainCard';
import SuccessOrderActions from '@/features/orders/components/pages/success/SuccessOrderActions';
import StatusTracker from '@/features/orders/components/StatusTracker';
import { useOrder } from '@/features/orders/hooks/use-order';
import { useParams } from 'react-router';

const OrderSuccessPage = () => {
  const params = useParams();
  const { data: order } = useOrder(Number(params.id));
  return (
    <>
      {order && (
        <div className="mx-auto w-full max-w-2xl space-y-6 px-4 py-12">
          <SuccessMainCard
            orderId={order.id}
            total={order.orderItems.reduce((sum, item) => {
              return sum + Number(item.price) * Number(item.quantity);
            }, 0)}
            date={order.date}
          />
          <StatusTracker
            status={order.status}
            deliveryMethod={
              order.deliveryMethod === 'Самовывоз' ? 'pickup' : 'delivery'
            }
          />
          <InfoList />
          <SuccessOrderActions />
        </div>
      )}
    </>
  );
};

export default OrderSuccessPage;

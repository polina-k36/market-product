import InfoList from '@/features/orders/components/pages/success/InfoList';
import SuccessMainCard from '@/features/orders/components/pages/success/SuccessMainCard';
import SuccessOrderActions from '@/features/orders/components/pages/success/SuccessOrderActions';
import StatusTracker from '@/features/orders/components/StatusTracker';

const OrderSuccessPage = () => {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 px-4 py-12">
      <SuccessMainCard orderId={421} total={5435.419} date={new Date()} />
      <StatusTracker status="PREPARING" deliveryMethod="pickup" />
      <InfoList />
      <SuccessOrderActions />
    </div>
  );
};

export default OrderSuccessPage;

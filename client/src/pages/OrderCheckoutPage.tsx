import OrderCheckout from '@/features/orders/components/pages/checkout/OrderCheckout';
import { useLocation, useParams } from 'react-router';

import type { IReservationItem } from '@/features/reservations/types/reservation.types';
import NotificationLayout from '@/components/layout/notification-layout/NotificationLayout';
const OrderCheckoutPage = () => {
  const params = useParams();

  const location = useLocation();

  const state = location.state as
    { isNewReservation: boolean; issues: IReservationItem[] } | undefined;
  const issues = state?.issues ?? [];

  return (
    <NotificationLayout>
      <OrderCheckout
        reservationId={Number(params.reservationId)}
        notificationItems={issues}
        isNewReservation={state?.isNewReservation ?? false}
      />
    </NotificationLayout>
  );
};

export default OrderCheckoutPage;

import OrderCheckout from '@/features/orders/components/pages/checkout/OrderCheckout';
import { useLocation, useParams } from 'react-router';
// FIXME: useRef предотвращает повторный вызов эффекта только в рамках одного экземпляра компонента и не гарантирует однократное создание резерва при повторном монтировании страницы.
// FIXME: защита от дублирования резервов должна обеспечиваться на сервере, например через проверку существующего активного резерва или механизм идемпотентности.
// FIXME: не обрабатываются состояния загрузки и ошибки создания резерва, поэтому пользователь может продолжить оформление заказа, даже если резервирование не удалось.
// FIXME: useCartItems не обрабатывает в этом компоненте состояния загрузки и ошибки получения корзины, из-за чего пользователь не понимает, почему товары не отображаются.
// TODO: при изменении состава корзины необходимо синхронизировать активный резерв с актуальными товарами и их количеством.
//TODO: в корзине через какие то промежутки времени проверять доступность товаров в выбраном магазине

//TODO: выносить за страницу логику и отображай дизайн  тут в странице
// придумать промежуточный этап мужду корзиной и страницей оформления заказа
// в компоненте заказа которы будет цельной страницей отображать сущствующий резерв => до этого нужно его создать или узнать о существуеющем
import type { IReservationItem } from '@/features/reservations/types/reservation.types';
const OrderCheckoutPage = () => {
  const params = useParams();

  const location = useLocation();

  const state = location.state as
    { isNewReservation: boolean; issues: IReservationItem[] } | undefined;
  const issues = state?.issues ?? [];

  return (
    <OrderCheckout
      reservationId={Number(params.reservationId)}
      notificationItems={issues}
      isNewReservation={state?.isNewReservation ?? false}
    />
  );
};

export default OrderCheckoutPage;

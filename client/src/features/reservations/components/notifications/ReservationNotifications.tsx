import Notification from '@/components/ui/notification/Notification';
import type {
  ReservationNotificationKind,
  ReservationProduct,
} from '../../types/reservation-notifications.types';
import ReservationProductList from './ReservationProductList';

interface ReservationNotificationsProps {
  kind: ReservationNotificationKind;
  products?: ReservationProduct[];
  onAction?: () => void;
  onClose?: () => void;
}

const notificationContent = {
  'fully-reserved': {
    type: 'success',
    title: 'Товары зарезервированы',
    description:
      'Все товары успешно зарезервированы. Можно продолжать оформление заказа.',
  },
  'partially-reserved': {
    type: 'warning',
    title: 'Не все товары доступны в нужном количестве',
    description:
      'Некоторые товары зарезервированы частично. Проверьте доступное количество.',
    actionLabel: 'Завершить оформление',
  },
  'not-reserved': {
    type: 'error',
    title: 'Некоторые товары недоступны',
    description: 'Следующие товары не удалось зарезервировать.',
    actionLabel: 'Завершить оформление',
  },
  'shop-changed': {
    type: 'info',
    title: 'Магазин изменён',
    description:
      'После проверки наличия в новом магазине обнаружены изменения.',
    actionLabel: 'Завершить оформление',
  },
  existing: {
    type: 'info',
    title: 'Продолжение оформления',
    description:
      'Найден существующий активный резерв. Вы можете продолжить оформление заказа.',
    actionLabel: 'Продолжить',
  },
} as const;

const ReservationNotifications = ({
  kind,
  products = [],
  onAction,
  onClose,
}: ReservationNotificationsProps) => {
  const content = notificationContent[kind];

  const showProducts =
    kind === 'partially-reserved' ||
    kind === 'not-reserved' ||
    kind === 'shop-changed';

  return (
    <Notification
      type={content.type}
      title={content.title}
      description={
        <>
          <p>{content.description}</p>

          {showProducts && products.length > 0 && (
            <ReservationProductList products={products} />
          )}
        </>
      }
      onClose={onClose}
      action={
        'actionLabel' in content && onAction
          ? {
              label: content.actionLabel,
              onClick: onAction,
            }
          : undefined
      }
    />
  );
};

export default ReservationNotifications;

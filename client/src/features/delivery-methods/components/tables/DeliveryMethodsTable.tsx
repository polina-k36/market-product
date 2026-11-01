import AdminTable from '@/components/ui/table/AdminTable';
import { useDeliveryMethods } from '../../hooks/use-delivery-methods';
import { useModalStore } from '@/stores/modal/modal.store';
import type { IDeliveryMethod } from '../../types/delivery-methods.types';
import Button from '@/components/ui/buttons/Button';
import { useRemoveDeliveryMethod } from '../../hooks/use-remove-delivery-method';
import { useNotificationStore } from '@/stores/notification/notification.store';
import DeliveryMethodAdminModal from '../modals/DeliveryMethodAdminModal';
import { deliveryMethodColumns } from '../../tables/delivery-method-columns';

const DeliveryMethodsTable = () => {
  const { data: deliveryMethods } = useDeliveryMethods();
  const { mutate: removeDeliveryMethod } = useRemoveDeliveryMethod();
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );
  const openCreateDeliveryMethodModal = useModalStore(
    (state) => state.openCreateDeliveryMethodModal,
  );
  const openUpdateDeliveryMethodModal = useModalStore(
    (state) => state.openUpdateDeliveryMethodModal,
  );

  const onAdd = () => {
    openCreateDeliveryMethodModal();
  };

  const onEdit = (row: IDeliveryMethod) => {
    openUpdateDeliveryMethodModal(row.id);
  };

  const onDelete = (row: IDeliveryMethod) => {
    addNotification({
      type: 'warning',
      title: 'Удаление способа доставки',
      description: `Вы действительно хотите удалить способ доставки #${row.id}?`,
      action: {
        label: 'Удалить способ доставки',
        onClick: () => {
          removeDeliveryMethod(row.id, {
            onSuccess: (data) => {
              addNotification({
                type: 'success',
                title: 'Удаление способа доставки',
                description: `Способ доставки #${data.id} успешно удален`,
                duration: 3000,
              });
            },
            onError: () => {
              addNotification({
                type: 'error',
                title: 'Ошибка удаления способа доставки',
                description: `Способ доставки #${row.id} не был удален`,
                duration: 3000,
              });
            },
          });
        },
      },
      duration: 0,
    });
  };

  if (!deliveryMethods) return null;

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-5 overflow-hidden">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">
            Справочник — Способы доставки
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Всего записей: {deliveryMethods.length}
          </p>
        </div>
        <Button variant="primary" type="button" onClick={onAdd}>
          + Добавить
        </Button>
      </div>

      <AdminTable
        data={deliveryMethods}
        columns={deliveryMethodColumns}
        getRowId={(deliveryMethod) => deliveryMethod.id}
        onEdit={onEdit}
        onDelete={onDelete}
        horizontalScroll
      />

      <DeliveryMethodAdminModal />
    </section>
  );
};

export default DeliveryMethodsTable;

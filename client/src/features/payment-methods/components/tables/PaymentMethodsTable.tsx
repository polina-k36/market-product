import AdminTable from '@/components/ui/table/AdminTable';
import { usePaymentMethods } from '../../hooks/use-payment-methods';
import { paymentMethodColumns } from '../../tables/payment-method-columns';
import { useModalStore } from '@/stores/modal/modal.store';
import type { IPaymentMethod } from '../../types/payment-methods.types';
import Button from '@/components/ui/buttons/Button';
import { useRemovePaymentMethod } from '../../hooks/use-remove-payment-method';
import { useNotificationStore } from '@/stores/notification/notification.store';
import PaymentMethodAdminModal from '../modals/PaymentMethodAdminModal';

const PaymentMethodsTable = () => {
  const { data: paymentMethods } = usePaymentMethods();
  const { mutate: removePaymentMethod } = useRemovePaymentMethod();
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );
  const openCreatePaymentMethodModal = useModalStore(
    (state) => state.openCreatePaymentMethodModal,
  );
  const openUpdatePaymentMethodModal = useModalStore(
    (state) => state.openUpdatePaymentMethodModal,
  );

  const onAdd = () => {
    openCreatePaymentMethodModal();
  };

  const onEdit = (row: IPaymentMethod) => {
    openUpdatePaymentMethodModal(row.id);
  };

  const onDelete = (row: IPaymentMethod) => {
    addNotification({
      type: 'warning',
      title: 'Удаление способа оплаты',
      description: `Вы действительно хотите удалить способ оплаты #${row.id}?`,
      action: {
        label: 'Удалить способ оплаты',
        onClick: () => {
          removePaymentMethod(row.id, {
            onSuccess: (response) => {
              addNotification({
                type: 'success',
                title: 'Удаление способа оплаты',
                description: `Способ оплаты #${response.data.id} успешно удален`,
                duration: 3000,
              });
            },
            onError: () => {
              addNotification({
                type: 'error',
                title: 'Ошибка удаления способа оплаты',
                description: `Способ оплаты #${row.id} не был удален`,
                duration: 3000,
              });
            },
          });
        },
      },
      duration: 0,
    });
  };

  if (!paymentMethods) return null;

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-5 overflow-hidden">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">
            Справочник — Способы оплаты
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Всего записей: {paymentMethods.data.length}
          </p>
        </div>
        <Button variant="primary" type="button" onClick={onAdd}>
          + Добавить
        </Button>
      </div>

      <AdminTable
        data={paymentMethods.data}
        columns={paymentMethodColumns}
        getRowId={(paymentMethod) => paymentMethod.id}
        onEdit={onEdit}
        onDelete={onDelete}
        horizontalScroll
      />

      <PaymentMethodAdminModal />
    </section>
  );
};

export default PaymentMethodsTable;

import AdminTable from '@/components/ui/table/AdminTable';
import { useSuppliers } from '../../hooks/use-suppliers';
import { supplierColumns } from '../../tables/supplier-columns';
import { useModalStore } from '@/stores/modal/modal.store';
import type { ISupplier } from '../../types/supplier.types';
import SupplierAdminModal from '../modals/SupplierAdminModal';
import Button from '@/components/ui/buttons/Button';
import { useRemoveSupplier } from '../../hooks/use-remove-supplier';
import { useNotificationStore } from '@/stores/notification/notification.store';

const SuppliersTable = () => {
  const { data: suppliers } = useSuppliers();
  const { mutate: removeSupplier } = useRemoveSupplier();
  const { addNotification } = useNotificationStore();
  const openCreateSupplierModal = useModalStore(
    (state) => state.openCreateSupplierModal,
  );
  const openUpdateSupplierModal = useModalStore(
    (state) => state.openUpdateSupplierModal,
  );

  const onAdd = () => {
    openCreateSupplierModal();
  };

  const onEdit = (row: ISupplier) => {
    openUpdateSupplierModal(row.id);
  };

  const onDelete = (row: ISupplier) => {
    removeSupplier(row.id, {
      onSuccess: (data) => {
        addNotification({
          type: 'success',
          title: 'Удаление поставщика',
          description: `Поставщик #${data.id} успешно удален`,
          duration: 3000,
        });
      },
      onError: () => {
        addNotification({
          type: 'error',
          title: 'Ошибка удаления поставщика',
          description: `Поставщик #${row.id} не был удален`,
          duration: 3000,
        });
      },
    });
  };

  if (!suppliers) return null;

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-5 overflow-hidden">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">
            Справочник — Поставщики
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Всего записей: {suppliers.length}
          </p>
        </div>
        <Button variant="primary" type="button" onClick={onAdd}>
          + Добавить
        </Button>
      </div>

      <AdminTable
        data={suppliers}
        columns={supplierColumns}
        getRowId={(supplier) => supplier.id}
        onEdit={onEdit}
        onDelete={onDelete}
        horizontalScroll
      />
      <SupplierAdminModal />
    </section>
  );
};

export default SuppliersTable;

import AdminTable from '@/components/ui/table/AdminTable';
import { useModalStore } from '@/stores/modal/modal.store';
import Button from '@/components/ui/buttons/Button';
import { useNotificationStore } from '@/stores/notification/notification.store';
import NdsAdminModal from '../modals/NdsAdminModal';
import { useNdsRates } from '../../hooks/use-nds-rates';
import { useRemoveNdsRate } from '../../hooks/use-remove-nds-rate';
import type { INds } from '../../types/nds.types';
import { ndsColumns } from '../../tables/nds-columns';

const NdsTable = () => {
  const { data: ndsRates } = useNdsRates();
  const { mutate: removeNdsRate } = useRemoveNdsRate();
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );
  const openCreateNdsModal = useModalStore((state) => state.openCreateNdsModal);
  const openUpdateNdsModal = useModalStore((state) => state.openUpdateNdsModal);

  const onAdd = () => {
    openCreateNdsModal();
  };

  const onEdit = (row: INds) => {
    openUpdateNdsModal(row.id);
  };

  const onDelete = (row: INds) => {
    addNotification({
      type: 'warning',
      title: 'Удаление ставки НДС',
      description: `Вы действительно хотите удалить ставку #${row.id} - ${row.titleRate}?`,
      action: {
        label: 'Удалить ставку НДС',
        onClick: () => {
          removeNdsRate(row.id, {
            onSuccess: (data) => {
              addNotification({
                type: 'success',
                title: 'Удаление ставки НДС',
                description: `Ставка #${data.id} - ${data.titleRate} успешно удалена`,
                duration: 3000,
              });
            },
            onError: () => {
              addNotification({
                type: 'error',
                title: 'Ошибка удаления способа оплаты',
                description: `Ставка #${row.id} - ${row.titleRate} не была удалена`,
                duration: 3000,
              });
            },
          });
        },
      },
      duration: 0,
    });
  };

  if (!ndsRates) return null;

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-5 overflow-hidden">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">
            Справочник — Ставки НДС
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Всего записей: {ndsRates.length}
          </p>
        </div>
        <Button variant="primary" type="button" onClick={onAdd}>
          + Добавить
        </Button>
      </div>

      <AdminTable
        data={ndsRates}
        columns={ndsColumns}
        getRowId={(nds) => nds.id}
        onEdit={onEdit}
        onDelete={onDelete}
        horizontalScroll
        isSearching
      />

      <NdsAdminModal />
    </section>
  );
};

export default NdsTable;

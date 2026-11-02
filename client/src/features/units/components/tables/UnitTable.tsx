import AdminTable from '@/components/ui/table/AdminTable';
import { useModalStore } from '@/stores/modal/modal.store';
import Button from '@/components/ui/buttons/Button';
import { useNotificationStore } from '@/stores/notification/notification.store';
import NdsAdminModal from '../modals/UnitAdminModal';
import { useUnits } from '../../hooks/use-units';
import { useRemoveUnit } from '../../hooks/use-remove-unit';
import type { IUnit } from '../../types/unit.types';
import { unitColumns } from '../../tables/unit-columns';

const UnitTable = () => {
  const { data: units } = useUnits();
  const { mutate: removeUnit } = useRemoveUnit();
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );
  const openCreateNdsModal = useModalStore((state) => state.openCreateNdsModal);
  const openUpdateNdsModal = useModalStore((state) => state.openUpdateNdsModal);

  const onAdd = () => {
    openCreateNdsModal();
  };

  const onEdit = (row: IUnit) => {
    openUpdateNdsModal(row.id);
  };

  const onDelete = (row: IUnit) => {
    addNotification({
      type: 'warning',
      title: 'Удаление единицы измерения',
      description: `Вы действительно хотите удалить единицу измерения #${row.id} - ${row.fullTitle}?`,
      action: {
        label: 'Удалить единицу измерения',
        onClick: () => {
          removeUnit(row.id, {
            onSuccess: (data) => {
              addNotification({
                type: 'success',
                title: 'Удаление единицы измерения',
                description: `Единица измерения #${data.id} - ${data.fullTitle} успешно удалена`,
                duration: 3000,
              });
            },
            onError: () => {
              addNotification({
                type: 'error',
                title: 'Ошибка удаления единицы измерения',
                description: `Единица измерения #${row.id} - ${row.fullTitle} не была удалена`,
                duration: 3000,
              });
            },
          });
        },
      },
      duration: 0,
    });
  };

  if (!units) return null;

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-5 overflow-hidden">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">
            Справочник — Единицы измерения
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Всего записей: {units.length}
          </p>
        </div>
        <Button variant="primary" type="button" onClick={onAdd}>
          + Добавить
        </Button>
      </div>

      <AdminTable
        data={units}
        columns={unitColumns}
        getRowId={(nds) => nds.id}
        onEdit={onEdit}
        onDelete={onDelete}
        horizontalScroll
      />

      <NdsAdminModal />
    </section>
  );
};

export default UnitTable;

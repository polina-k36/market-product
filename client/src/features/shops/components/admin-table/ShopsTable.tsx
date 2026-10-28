import AdminTable from '@/components/ui/table/AdminTable';
import { useShops } from '../../hooks/use-shops';
import { shopColumns } from '../../tables/shop-columns';
import ShopAdminModal from '../modals/ShopAdminModal';
import { useModalStore } from '@/stores/modal/modal.store';
import type { IShopData } from '../../types/shop.types';
import { useRemoveShop } from '../../hooks/use-remove-shop';
import { useNotificationStore } from '@/stores/notification/notification.store';
import Button from '@/components/ui/buttons/Button';

const ShopsTable = () => {
  const { data: shops } = useShops();

  const openCreateShopModal = useModalStore(
    (state) => state.openCreateShopModal,
  );

  const openUpdateShopModal = useModalStore(
    (state) => state.openUpdateShopModal,
  );

  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );

  const { mutate: removeShop } = useRemoveShop();

  const onAdd = () => {
    openCreateShopModal();
  };

  const onEdit = (row: IShopData) => {
    openUpdateShopModal(row.id);
  };

  const onDelete = (row: IShopData) => {
    addNotification({
      type: 'warning',
      title: 'Подтверждение действий',
      description: `Вы действительно хотите удалить магазин #${row.id}`,
      action: {
        label: 'Удалить магазин',
        onClick: () => {
          removeShop(row.id, {
            onSuccess: () => {
              addNotification({
                type: 'success',
                title: 'Успешное удаление',
                description: `Удаление магазина #${row.id} прошло успешно`,
                duration: 3000,
              });
            },
            onError: () => {
              addNotification({
                type: 'error',
                title: 'Ошибка удаления',
                description: `Удаление магазина #${row.id} не было завершено`,
                duration: 3000,
              });
            },
          });
        },
      },
      duration: 0,
    });
  };

  if (!shops) return null;

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-5 overflow-hidden">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">
            Справочник — Магазины
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Всего записей: {shops.length}
          </p>
        </div>
        <Button type="button" onClick={onAdd} variant="primary">
          + Добавить
        </Button>
      </div>

      <AdminTable
        data={shops}
        columns={shopColumns}
        getRowId={(shop) => shop.id}
        onEdit={onEdit}
        onDelete={onDelete}
        horizontalScroll
      />
      <ShopAdminModal />
    </section>
  );
};
export default ShopsTable;

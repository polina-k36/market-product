import AdminTable from '@/components/ui/table/AdminTable';
import { useCategories } from '../../hooks/use-categories';
import { categoryColumns } from '../../tables/category-columns';
import CategoryAdminModal from '../../modals/CategoryAdminModal';
import { useModalStore } from '@/stores/modal/modal.store';
import type { IFullCategory } from '../../types/categories.types';
import { useRemoveCategory } from '../../hooks/use-remove-category';
import { useNotificationStore } from '@/stores/notification/notification.store';
import Button from '@/components/ui/buttons/Button';

const CategoriesTable = () => {
  const { data: categories } = useCategories();
  const openCreateCategoryModal = useModalStore(
    (state) => state.openCreateCategoryModal,
  );
  const openUpdateCategoryModal = useModalStore(
    (state) => state.openUpdateCategoryModal,
  );
  const { mutate: removeCategory } = useRemoveCategory();
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );

  const onAdd = () => {
    openCreateCategoryModal();
  };

  const onEdit = (row: IFullCategory) => {
    openUpdateCategoryModal(row.id);
  };

  const onDelete = (row: IFullCategory) => {
    addNotification({
      type: 'warning',
      title: 'Подтверждение действий',
      description: `Вы действительно хотите удалить категорию #${row.id} - ${row.title}`,
      action: {
        label: 'Удалить категорию',
        onClick: () => {
          removeCategory(row.id, {
            onSuccess: () => {
              addNotification({
                type: 'success',
                title: 'Успешное удаление',
                description: `Удаление категории #${row.id} прошло успешно`,
                duration: 3000,
              });
            },
            onError: () => {
              addNotification({
                type: 'error',
                title: 'Ошибка удаления',
                description: `Удаление категории #${row.id} не было завершено`,
                duration: 3000,
              });
            },
          });
        },
      },
      duration: 0,
    });
  };

  if (!categories) return null;

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-5 overflow-hidden">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">
            Справочник — Пользователи
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Всего записей: {categories.length}
          </p>
        </div>

        <Button variant="primary" type="button" onClick={onAdd}>
          + Добавить
        </Button>
      </div>

      <AdminTable
        data={categories}
        columns={categoryColumns}
        getRowId={(category) => category.id}
        onEdit={onEdit}
        onDelete={onDelete}
        horizontalScroll
      />
      <CategoryAdminModal />
    </section>
  );
};

export default CategoriesTable;

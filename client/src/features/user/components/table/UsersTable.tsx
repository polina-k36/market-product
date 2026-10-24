import AdminTable from '@/components/ui/table/AdminTable';
import { useUsers } from '../../hooks/use-users';
import { userColumns } from '../../tables/user-columns';

const UsersTable = () => {
  const { data: users } = useUsers();
  const onAdd = () => {
    console.log('Добавить продукт');
  };

  const onEdit = () => {
    console.log('Редактировать', 2);
  };

  const onDelete = () => {
    console.log('Удалить', 2);
  };

  if (!users) return null;

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-5 overflow-hidden">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">
            Справочник — Пользователи
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Всего записей: {users.data.length}
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-text-inverse transition hover:bg-primary-hover"
        >
          + Добавить
        </button>
      </div>

      <AdminTable
        data={users.data}
        columns={userColumns}
        getRowId={(user) => user.id}
        onEdit={onEdit}
        onDelete={onDelete}
        horizontalScroll
      />
    </section>
  );
};

export default UsersTable;

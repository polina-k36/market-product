import AdminTable from '@/components/ui/table/AdminTable';
import { useShops } from '../../hooks/use-shops';
import { shopColumns } from '../../model/shop-columns';

const ShopsTable = () => {
  const { data: shops } = useShops();

  const onAdd = () => {
    console.log('Добавить продукт');
  };

  const onEdit = () => {
    console.log('Редактировать', 2);
  };

  const onDelete = () => {
    console.log('Удалить', 2);
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

        <button
          type="button"
          onClick={onAdd}
          className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-text-inverse transition hover:bg-primary-hover"
        >
          + Добавить
        </button>
      </div>

      <AdminTable
        data={shops}
        columns={shopColumns}
        getRowId={(shop) => shop.id_shop}
        onEdit={onEdit}
        onDelete={onDelete}
        horizontalScroll
      />
    </section>
  );
};
export default ShopsTable;

import AdminTable from '@/components/ui/table/AdminTable';
import { useAllOrders } from '../../hooks/admin/use-all-orders';
import { orderColumns } from '../../tables/order-columns';

const OrdersTable = () => {
  const { data: orders } = useAllOrders();
  if (!orders) return null;

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-5 overflow-hidden">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">
            Справочник — Продукты
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Всего записей: {orders.length}
          </p>
        </div>
      </div>

      <AdminTable
        data={orders}
        columns={orderColumns}
        getRowId={(order) => order.id}
        horizontalScroll
      />
    </section>
  );
};

export default OrdersTable;

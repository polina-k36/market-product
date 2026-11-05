import AdminTable from '@/components/ui/table/AdminTable';
import { useAllOrders } from '../../hooks/admin/use-all-orders';
import { orderColumns } from '../../tables/order-columns';
import { ordersApi } from '../../api/orders.api';
import { useNotificationStore } from '@/stores/notification/notification.store';

const OrdersTable = () => {
  const { data: orders } = useAllOrders();
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );
  if (!orders) return null;

  const handleDownloadPdf = (id: number) => {
    ordersApi
      .exportOrderPdf(id)
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = `order-${id}.pdf`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      })
      .catch(() => {
        addNotification({
          type: 'error',
          title: 'Не удалось скачать чек',
          description: 'Попробуйте скачать документ ещё раз.',
          duration: 3000,
        });
      });
  };

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-5 overflow-hidden">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">
            Документ — Заказы
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
        onDownloadPdf={(row) => handleDownloadPdf(row.id)}
        horizontalScroll
        isSearching
      />
    </section>
  );
};

export default OrdersTable;

import AdminTable from '@/components/ui/table/AdminTable';
import { invoiceColumns } from '../../tables/invoice-columns';
import type { IInvoice } from '../../types/invoice.types';
import Button from '@/components/ui/buttons/Button';
import { invoiceApi } from '../../api/invoice.api';
import { useNotificationStore } from '@/stores/notification/notification.store';

interface IInvoicesTableProp {
  title: string;
  invoices: IInvoice[] | undefined;
  onAdd?: () => void;
  onEdit?: (row: IInvoice) => void;
  onDelete?: (row: IInvoice) => void;
}

const InvoicesTable = ({
  title,
  invoices,
  onAdd,
  onDelete,
  onEdit,
}: IInvoicesTableProp) => {
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );

  if (!invoices) return null;

  const handleDownloadPdf = (id: number) => {
    invoiceApi
      .exportInvoicePdf(id)
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = `invoice-${id}.pdf`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      })
      .catch(() => {
        addNotification({
          type: 'error',
          title: 'Не удалось скачать накладную',
          description: 'Попробуйте скачать документ ещё раз.',
          duration: 3000,
        });
      });
  };

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-5 overflow-hidden">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">{title}</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Всего записей: {invoices.length}
          </p>
        </div>

        {onAdd && (
          <Button type="button" onClick={onAdd} variant="primary">
            + Добавить
          </Button>
        )}
      </div>

      <AdminTable
        data={invoices}
        columns={invoiceColumns}
        getRowId={(invoice) => invoice.id}
        onEdit={onEdit}
        onDelete={onDelete}
        onDownloadPdf={(row) => handleDownloadPdf(row.id)}
        horizontalScroll
        isSearching
      />
    </section>
  );
};

export default InvoicesTable;

import AdminTable from '@/components/ui/table/AdminTable';
import { useInvoices } from '../../hooks/use-invoices';
import { invoiceColumns } from '../../tables/invoice-columns';

const InvoicesTable = () => {
  const { data: invoices } = useInvoices();
  const onAdd = () => {
    console.log('Добавить');
  };

  const onEdit = () => {
    console.log('Редактировать', 2);
  };

  const onDelete = () => {
    console.log('Удалить', 2);
  };

  if (!invoices) return null;

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-5 overflow-hidden">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">
            Справочник — Накладные
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Всего записей: {invoices.length}
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
        data={invoices}
        columns={invoiceColumns}
        getRowId={(invoice) => invoice.id}
        onEdit={onEdit}
        onDelete={onDelete}
        horizontalScroll
      />
    </section>
  );
};

export default InvoicesTable;

import { useExpensesInvoices } from '../../hooks/use-expenses-invoices';
import InvoicesTable from './InvoicesTable';

const ExpensesInvoiceTable = () => {
  const { data: invoices } = useExpensesInvoices();
  return <InvoicesTable title="Накладная расхода" invoices={invoices} />;
};

export default ExpensesInvoiceTable;

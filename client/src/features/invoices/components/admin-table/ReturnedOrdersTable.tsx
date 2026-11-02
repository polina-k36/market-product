import { useReturnInvoices } from '../../hooks/use-return-invoices';
import InvoicesTable from './InvoicesTable';

const ReturnedOrdersTable = () => {
  const { data: invoices } = useReturnInvoices();
  return <InvoicesTable title="Возвраты пользователей" invoices={invoices} />;
};

export default ReturnedOrdersTable;

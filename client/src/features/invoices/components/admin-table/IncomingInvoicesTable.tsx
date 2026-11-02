import { useIncomingInvoices } from '../../hooks/use-incoming-invoices';
import InvoicesTable from './InvoicesTable';

const IncomingInvoicesTable = () => {
  const { data: invoices } = useIncomingInvoices();
  return <InvoicesTable title="Накладная прихода" invoices={invoices} />;
};

export default IncomingInvoicesTable;

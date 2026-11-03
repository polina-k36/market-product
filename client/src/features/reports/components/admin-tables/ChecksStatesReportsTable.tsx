import AdminTable from '@/components/ui/table/AdminTable';
import { useState } from 'react';
import ReportPeriodSelect from '../../ui/ReportPeriodSelect';
import { useChecksStates } from '../../hooks/use-checks-state';
import { checksStateColumns } from '../../tables/checks-state.columns';

const ChecksStatesReportsTable = () => {
  const [period, setPeriod] = useState(100);
  const { data: orders, isLoading } = useChecksStates(period);

  if (!orders && isLoading) {
    return <div className="p-6 text-text-secondary">Загрузка отчёта...</div>;
  }

  if (!orders) return null;

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-5 overflow-hidden">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">
            Отчёт — Статусы заказов
          </h2>

          <p className="mt-1 text-sm text-text-secondary">
            Всего записей: {orders.length}
          </p>
        </div>
        <ReportPeriodSelect period={period} onChange={setPeriod} />
      </div>

      <AdminTable
        data={orders}
        columns={checksStateColumns}
        getRowId={(order) => order.id}
        horizontalScroll
      />
    </section>
  );
};

export default ChecksStatesReportsTable;

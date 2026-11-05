import AdminTable from '@/components/ui/table/AdminTable';

import { useState } from 'react';

import { useAllChecks } from '../../hooks/use-all-checks';
import { allChecksColumns } from '../../tables/all-checks.columns';
import ReportPeriodSelect from '../ui/ReportPeriodSelect';
import ExportExcelButton from '@/components/ui/buttons/ExportExcelButton';
import { reportApi } from '../../api/report.api';
import { formatDateTimeForFile } from '@/utils/format-date.utils';

const AllChecksReportsTable = () => {
  const [period, setPeriod] = useState(100);

  const { data: orders, isLoading } = useAllChecks(period);

  if (!orders && isLoading) {
    return <div className="p-6 text-text-secondary">Загрузка отчёта...</div>;
  }

  if (!orders) return null;

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-5 overflow-hidden">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">
            Отчёт — Заказы
          </h2>

          <p className="mt-1 text-sm text-text-secondary">
            Всего записей: {orders.length}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <ReportPeriodSelect period={period} onChange={setPeriod} />

          <ExportExcelButton
            onExport={() => reportApi.exportAllChecksExcel(period)}
            fileName={`all-checks_${period}-days_${formatDateTimeForFile(new Date())}.xlsx`}
          />
        </div>
      </div>

      <AdminTable
        data={orders}
        columns={allChecksColumns}
        getRowId={(order) => order.id}
        horizontalScroll
      />
    </section>
  );
};

export default AllChecksReportsTable;

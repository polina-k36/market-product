import AdminTable from '@/components/ui/table/AdminTable';
import { useState } from 'react';
import ReportPeriodSelect from '../ui/ReportPeriodSelect';
import { usePopularCategories } from '../../hooks/use-popular-categories';
import { popularCategoryColumns } from '../../tables/popular-category.columns';
import ExportExcelButton from '@/components/ui/buttons/ExportExcelButton';
import { reportApi } from '../../api/report.api';
import { formatDateTimeForFile } from '@/utils/format-date.utils';

const PopularCategoriesReportsTable = () => {
  const [period, setPeriod] = useState(100);
  const { data: categories, isLoading } = usePopularCategories(period);

  if (!categories && isLoading) {
    return <div className="p-6 text-text-secondary">Загрузка отчёта...</div>;
  }

  if (!categories) return null;

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-5 overflow-hidden">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">
            Отчёт — Популярные категории
          </h2>

          <p className="mt-1 text-sm text-text-secondary">
            Всего записей: {categories.length}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <ReportPeriodSelect period={period} onChange={setPeriod} />

          <ExportExcelButton
            onExport={() => reportApi.exportPopularCategories(period)}
            fileName={`popular-categories_${period}-days_${formatDateTimeForFile(new Date())}.xlsx`}
          />
        </div>
      </div>

      <AdminTable
        data={categories}
        columns={popularCategoryColumns}
        getRowId={(category) => category.id}
        horizontalScroll
        isSearching={false}
      />
    </section>
  );
};

export default PopularCategoriesReportsTable;

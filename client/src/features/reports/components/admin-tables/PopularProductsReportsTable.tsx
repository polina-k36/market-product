import AdminTable from '@/components/ui/table/AdminTable';
import { useState } from 'react';
import ReportPeriodSelect from '../../ui/ReportPeriodSelect';
import { usePopularProducts } from '../../hooks/use-popular-products';
import { popularProductColumns } from '../../tables/popular-product.columns';

const PopularProductsReportsTable = () => {
  const [period, setPeriod] = useState(100);
  const { data: products, isLoading } = usePopularProducts(period);

  if (!products && isLoading) {
    return <div className="p-6 text-text-secondary">Загрузка отчёта...</div>;
  }

  if (!products) return null;

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-5 overflow-hidden">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">
            Отчёт — Популярные продукты
          </h2>

          <p className="mt-1 text-sm text-text-secondary">
            Всего записей: {products.length}
          </p>
        </div>
        <ReportPeriodSelect period={period} onChange={setPeriod} />
      </div>

      <AdminTable
        data={products}
        columns={popularProductColumns}
        getRowId={(product) => product.id}
        horizontalScroll
      />
    </section>
  );
};

export default PopularProductsReportsTable;

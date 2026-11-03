import { useState } from 'react';
import MainAdminLayout from '@/components/layout/main-admin-layout/MainAdminLayout';
import CategoriesTable from '@/features/categories/components/admin-table/CategoriesTable';
import ProductsTable from '@/features/products/components/admin-table/ProductsTable';
import ShopsTable from '@/features/shops/components/admin-table/ShopsTable';
import UsersTable from '@/features/user/components/table/UsersTable';
import SuppliersTable from '@/features/suppliers/components/admin-table/SuppliersTable';
import PaymentMethodsTable from '@/features/payment-methods/components/tables/PaymentMethodsTable';
import DeliveryMethodsTable from '@/features/delivery-methods/components/tables/DeliveryMethodsTable';
import NdsTable from '@/features/nds/components/tables/NdsTable';
import UnitTable from '@/features/units/components/tables/UnitTable';
import IncomingInvoicesTable from '@/features/invoices/components/admin-table/IncomingInvoicesTable';
import ExpensesInvoicesTable from '@/features/invoices/components/admin-table/ExpensesInvoicesTable';
import OrdersTable from '@/features/orders/components/admin-table/OrdersTable';
import AllChecksReportsTable from '@/features/reports/components/admin-tables/AllChecksReportsTable';
import AvgOrdersReportsTable from '@/features/reports/components/admin-tables/AvgOrdersReportsTable';
import ChecksStatesReportsTable from '@/features/reports/components/admin-tables/ChecksStatesReportsTable';
import PopularProductsReportsTable from '@/features/reports/components/admin-tables/PopularProductsReportsTable';
import PopularCategoriesReportsTable from '@/features/reports/components/admin-tables/PopularCategoriesReportsTable';

const MainAdminPage = () => {
  const [activeSection, setActiveSection] = useState('products');

  return (
    <MainAdminLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {activeSection === 'products' && <ProductsTable />}
      {activeSection === 'users' && <UsersTable />}
      {activeSection === 'shops' && <ShopsTable />}
      {activeSection === 'categories' && <CategoriesTable />}
      {activeSection === 'suppliers' && <SuppliersTable />}
      {activeSection === 'payments' && <PaymentMethodsTable />}
      {activeSection === 'deliveries' && <DeliveryMethodsTable />}
      {activeSection === 'nds' && <NdsTable />}
      {activeSection === 'units' && <UnitTable />}

      {activeSection === 'orders' && <OrdersTable />}
      {activeSection === 'incoming-invoices' && <IncomingInvoicesTable />}
      {activeSection === 'expenses-invoices' && <ExpensesInvoicesTable />}

      {activeSection === 'all-checks-by-date' && <AllChecksReportsTable />}
      {activeSection === 'average-check' && <AvgOrdersReportsTable />}
      {activeSection === 'orders-by-status' && <ChecksStatesReportsTable />}
      {activeSection === 'popular-products' && <PopularProductsReportsTable />}
      {activeSection === 'popular-categories' && (
        <PopularCategoriesReportsTable />
      )}
    </MainAdminLayout>
  );
};

export default MainAdminPage;

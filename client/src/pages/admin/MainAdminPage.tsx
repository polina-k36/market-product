import { useState } from 'react';
import MainAdminLayout from '@/components/layout/main-admin-layout/MainAdminLayout';
import CategoriesTable from '@/features/categories/components/admin-table/CategoriesTable';
import InvoicesTable from '@/features/invoices/components/admin-table/InvoicesTable';
import ProductsTable from '@/features/products/components/admin-table/ProductsTable';
import ShopsTable from '@/features/shops/components/admin-table/ShopsTable';
import UsersTable from '@/features/user/components/table/UsersTable';
import SuppliersTable from '@/features/suppliers/components/admin-table/SuppliersTable';
import PaymentMethodsTable from '@/features/payment-methods/components/tables/PaymentMethodsTable';
import DeliveryMethodsTable from '@/features/delivery-methods/components/tables/DeliveryMethodsTable';
import NdsTable from '@/features/nds/components/tables/NdsTable';
import UnitTable from '@/features/units/components/tables/UnitTable';

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

      {activeSection === 'checks' && <InvoicesTable />}
    </MainAdminLayout>
  );
};

export default MainAdminPage;

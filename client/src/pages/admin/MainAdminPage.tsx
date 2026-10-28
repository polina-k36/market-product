import { useState } from 'react';
import MainAdminLayout from '@/components/layout/main-admin-layout/MainAdminLayout';
import CategoriesTable from '@/features/categories/components/admin-table/CategoriesTable';
import InvoicesTable from '@/features/invoices/components/admin-table/InvoicesTable';
import ProductsTable from '@/features/products/components/admin-table/ProductsTable';
import ShopsTable from '@/features/shops/components/admin-table/ShopsTable';
import UsersTable from '@/features/user/components/table/UsersTable';

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
      {activeSection === 'checks' && <InvoicesTable />}
    </MainAdminLayout>
  );
};

export default MainAdminPage;

import MainAdminLayout from '@/components/layout/main-admin-layout/MainAdminLayout';
import { useLogout } from '@/features/auth/hooks/use-logout';
import CategoriesTable from '@/features/categories/components/admin-table/CategoriesTable';
import InvoicesTable from '@/features/invoices/components/admin-table/InvoicesTable';
import ProductsTable from '@/features/products/components/admin-table/ProductsTable';
import ShopsTable from '@/features/shops/components/admin-table/ShopsTable';
import UsersTable from '@/features/user/components/table/UsersTable';
import { useAuthStore } from '@/stores/auth/auth.store';
import { useState } from 'react';

const MainAdminPage = () => {
  return (
    <MainAdminLayout>
      {/* <ProductsTable /> */}
      {/* <UsersTable /> */}
      <ShopsTable />
      {/* <CategoriesTable /> */}
      {/* <InvoicesTable /> */}
    </MainAdminLayout>
  );
};

export default MainAdminPage;

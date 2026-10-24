import MainAdminLayout from '@/components/layout/main-admin-layout/MainAdminLayout';
import CategoriesTable from '@/features/categories/components/admin-table/CategoriesTable';
import ProductsTable from '@/features/products/components/admin-table/ProductsTable';
import ShopsTable from '@/features/shops/components/admin-table/ShopsTable';
import UsersTable from '@/features/user/components/table/UsersTable';
import { useState } from 'react';

const MainAdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <MainAdminLayout onLogout={onLogout}>
      {/* <ProductsTable /> */}
      {/* <UsersTable /> */}
      {/* <ShopsTable /> */}
      <CategoriesTable />
    </MainAdminLayout>
  );
};

export default MainAdminPage;

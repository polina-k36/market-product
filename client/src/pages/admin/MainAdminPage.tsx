import MainAdminLayout from '@/components/layout/main-admin-layout/MainAdminLayout';
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
      <ShopsTable />
    </MainAdminLayout>
  );
};

export default MainAdminPage;

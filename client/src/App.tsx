import { BrowserRouter, Routes, Route } from 'react-router';
import MainPage from './pages/MainPage';
import ProductPage from './pages/ProductPage';
import AuthPage from './pages/AuthPage';
import AuthBootstrap from './app/bootstrap/AuthBootstrap';
import ProfilePage from './pages/ProfilePage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import VerificationEmailPage from './pages/VerificationEmailPage';
import OrderCheckoutPage from './pages/OrderCheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import MainAdminPage from './pages/admin/MainAdminPage';
import ProtectedAdminRoute from './router/ProtectedAdminRoute';

const App = () => {
  return (
    <>
      <AuthBootstrap />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders/:id" element={<OrderDetailsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/verification/email/confirm"
            element={<VerificationEmailPage />}
          />
          <Route
            path="/orders/checkout/:reservationId"
            element={<OrderCheckoutPage />}
          />
          <Route path="/orders/:id/success" element={<OrderSuccessPage />} />

          <Route element={<ProtectedAdminRoute />}>
            <Route path="/admin" element={<MainAdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import '@/styles/global.css';
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

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     staleTime: 1000 * 60 * 5, // дефолтные значения для всех запросов например время актуальности данных //зачастую 5 минут
  //   }
  // }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
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
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);

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
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);

import Header from '@/components/layout/header/Header';
import ProductDetails from '@/features/products/components/product-page/ProductDetails';
import ProductDetailsError from '@/features/products/components/product-page/ProductDetailsError';
import ProductDetailsSkeleton from '@/features/products/components/product-page/ProductDetailsSkeleton';
import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';

const ProductPage = () => {
  const params = useParams();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }, []);
  return (
    <>
      <Header />
      <ErrorBoundary FallbackComponent={ProductDetailsError}>
        <Suspense fallback={<ProductDetailsSkeleton />}>
          {Number.isInteger(Number(params.id)) && (
            <ProductDetails id={Number(params.id)} />
          )}
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default ProductPage;

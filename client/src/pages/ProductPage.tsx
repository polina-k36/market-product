import Header from '@/components/layout/header/Header';
import { useCartStore } from '@/features/cart/store/cart.store';
import ProductDetails from '@/features/products/components/product-page/ProductDetails';
import ProductDetailsError from '@/features/products/components/product-page/ProductDetailsError';
import ProductDetailsSkeleton from '@/features/products/components/product-page/ProductDetailsSkeleton';
import { useProduct } from '@/features/products/hooks/use-product';
import { useEffect } from 'react';

import { useParams } from 'react-router';

const ProductPage = () => {
  const params = useParams();
  const {
    data: product,
    isSuccess,
    isFetching,
    isError,
    refetch,
  } = useProduct(Number(params.id));

  const { closeCart } = useCartStore();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
    closeCart();
  }, []);

  //FIXME исправить хэдер так как в нем нет кнопок для карта
  return (
    <>
      {Number.isInteger(Number(params.id)) && (
        <>
          <Header />
          {isError && <ProductDetailsError resetError={() => refetch()} />}
          {isFetching && <ProductDetailsSkeleton />}
          {isSuccess && product && <ProductDetails product={product} />}
        </>
      )}
    </>
  );
};

export default ProductPage;

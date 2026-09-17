import { useQueryClient } from '@tanstack/react-query';
import { useProductFilters } from '../../hooks/use-product-filters';
import { PRODUCTS_QUERY_KEY, useProducts } from '../../hooks/use-products';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import ProductGridError from './ProductGridError';
import FilterPanel from './FilterPanel';

const ProductGrid = () => {
  const { filters } = useProductFilters();
  const {
    data: products,
    isPending,
    isError,
    isSuccess,
  } = useProducts(filters);
  const queryClient = useQueryClient();

  const refetchData = () => {
    queryClient.refetchQueries({
      queryKey: [...PRODUCTS_QUERY_KEY, filters],
    });
  };
  return (
    <>
      <FilterPanel />
      {isError && <ProductGridError onRetry={refetchData} />}
      <div
        className={`mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
      >
        {isPending &&
          Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        {isSuccess &&
          products.data.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              unit={product.unit.shortTitle}
              category={product.category}
              imgUrl={product.imageKey}
            />
          ))}
      </div>
    </>
  );
};

export default ProductGrid;

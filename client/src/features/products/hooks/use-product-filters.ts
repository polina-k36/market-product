import { useSearchParams } from 'react-router';
import type { ProductFilterKey } from '../types/products.types';

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getStringParam = (key: ProductFilterKey) => {
    return searchParams.get(key) ?? undefined;
  };

  const getNumberParam = (key: ProductFilterKey) => {
    const value = searchParams.get(key);

    if (value === null) {
      return undefined;
    }

    const number = Number(value);
    return Number.isNaN(number) || number < 0 ? undefined : number;
  };

  const changeSearchParams = (key: ProductFilterKey, value?: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (value !== undefined && value !== '') {
        next.set(key, value);
        if (key !== 'page') {
          next.set('page', '1');
        }
      } else {
        next.delete(key);
        next.set('page', '1');
      }

      return next;
    });
  };
  const setPage = (page: number) => {
    changeSearchParams('page', `${page}`);
  };
  const setSearch = (search?: string) => {
    changeSearchParams('search', search);
  };

  const setPriceRange = (priceFrom?: number, priceTo?: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (priceFrom !== undefined) {
        next.set('priceFrom', String(priceFrom));
      } else {
        next.delete('priceFrom');
      }

      if (priceTo !== undefined) {
        next.set('priceTo', String(priceTo));
      } else {
        next.delete('priceTo');
      }

      next.set('page', '1');

      return next;
    });
  };

  const clearAllFilters = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      next.delete('priceTo');
      next.delete('priceFrom');
      next.delete('search');
      next.delete('categoryId');

      next.set('page', '1');

      return next;
    });
  };

  const setCategoryId = (id?: number) => {
    const value = id !== undefined && id > 0 ? `${id}` : undefined;
    changeSearchParams('categoryId', value);
  };

  return {
    filters: {
      page: getNumberParam('page') ?? 1,
      search: getStringParam('search'),
      priceFrom: getNumberParam('priceFrom'),
      priceTo: getNumberParam('priceTo'),
      categoryId: getNumberParam('categoryId'),
    },
    actions: {
      setPage,
      setSearch,
      setPriceRange,
      setCategoryId,
      clearAllFilters,
    },
  };
}

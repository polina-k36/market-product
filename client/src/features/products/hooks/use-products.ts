import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { productsApi } from '../api/products.api';
import { PRODUCTS_LIMIT } from '../constants';
import type { IProductFilters } from '../types/products.types';

export const PRODUCTS_QUERY_KEY = ['products'] as const;

export function useProducts(filters: Omit<IProductFilters, 'limit'>) {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, filters],
    queryFn: () =>
      productsApi.getProducts({
        limit: PRODUCTS_LIMIT,
        ...filters,
      }),
    placeholderData: keepPreviousData,
  });
}

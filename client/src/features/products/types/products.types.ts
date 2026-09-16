export interface IPromoProduct {
  id: number;
  title: string;
  imageKey: string;
  price: string;
  category: string;
  unit: {
    fullTitle: string;
    shortTitle: string;
  };
}

export interface IProductFilters {
  page: number;
  limit: number;
  search?: string;
  priceFrom?: number;
  priceTo?: number;
  categoryId?: number;
}

export type ProductFilterKey =
  'page' | 'search' | 'priceFrom' | 'priceTo' | 'categoryId';

export interface IPromoProduct {
  id: number;
  title: string;
  composition: string;
  description: string;
  imageKey: string;
  price: string;
  category: string;
  unit: {
    fullTitle: string;
    shortTitle: string;
  };
  nds: string;
  cartQuantity: number;
}

export interface IFullProduct {
  id: number;
  title: string;
  composition: string;
  description: string;
  imageKey: string;
  price: string;
  category: {
    id: number;
    title: string;
  };
  nds: {
    id: number;
    rate: number;
    titleRate: string;
  };
  unit: {
    id: number;
    shortTitle: string;
    fullTitle: string;
  };
  cartQuantity: number;
}

export interface IProductFilters {
  page: number;
  limit: number;
  search?: string;
  priceFrom?: number;
  priceTo?: number;
  categoryId?: number;
}

export interface ICreateProduct {
  title: string;
  description: string;
  composition: string;
  imageKey: string;
  price: number;
  categoryId: number;
  unitId: number;
  ndsId: number;
}

export interface ICreatedProductInfo {
  id: number;
  title: string;
  description: string;
  composition: string;
  imageKey: string;
  price: number;
}

export interface IUpdateProduct {
  title?: string;
  description?: string;
  composition?: string;
  imageKey?: string;
  price?: number;
  categoryId?: number;
  unitId?: number;
  ndsId?: number;
}

export type ProductFilterKey =
  'page' | 'search' | 'priceFrom' | 'priceTo' | 'categoryId';

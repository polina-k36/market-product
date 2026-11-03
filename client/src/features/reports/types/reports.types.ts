export interface IAllChecksReport {
  id: number;
  date: string;
  shopAddress: string;
  ordersCount: number;
}

export interface IChecksStateReport {
  id: number;
  date: string;
  shopAddress: string;
  completedOrders: number;
  cancelledOrders: number;
}

export interface IAvgReport {
  id: number;
  shopAddress: string;
  averageOrderPrice: number;
}

export interface IPopularCategoryReport {
  id: number;
  category: string;
  quantity: number;
  revenue: number;
  salesShare: number;
}

export interface IPopularProductReport {
  id: number;
  product: string;
  soldQuantity: string;
  revenue: number;
}

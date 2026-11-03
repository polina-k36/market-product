import { api } from '@/api/axios';
import type { IResponse } from '@/types/api/api-response.type';
import type {
  IAllChecksReport,
  IAvgReport,
  IChecksStateReport,
  IPopularCategoryReport,
  IPopularProductReport,
} from '../types/reports.types';

export const reportApi = {
  allChecks: async (period: number): Promise<IAllChecksReport[]> => {
    const { data } = await api.get<IResponse<IAllChecksReport[]>>(
      '/reports/all-checks',
      {
        params: {
          period,
        },
      },
    );
    return data.data;
  },
  checksStates: async (period: number): Promise<IChecksStateReport[]> => {
    const { data } = await api.get<IResponse<IChecksStateReport[]>>(
      '/reports/checks-state',
      {
        params: {
          period,
        },
      },
    );
    return data.data;
  },
  avgOrders: async (period: number): Promise<IAvgReport[]> => {
    const { data } = await api.get<IResponse<IAvgReport[]>>('/reports/avg', {
      params: {
        period,
      },
    });
    return data.data;
  },
  popularCategories: async (
    period: number,
  ): Promise<IPopularCategoryReport[]> => {
    const { data } = await api.get<IResponse<IPopularCategoryReport[]>>(
      '/reports/popular-categories',
      {
        params: {
          period,
        },
      },
    );
    return data.data;
  },
  popularProducts: async (period: number): Promise<IPopularProductReport[]> => {
    const { data } = await api.get<IResponse<IPopularProductReport[]>>(
      '/reports/popular-products',
      {
        params: {
          period,
        },
      },
    );
    return data.data;
  },
};

import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

import {
  ReportType,
  type IAllChecksReport,
  type IChecksStateReport,
  type IAvgReport,
  type IPopularCategoryReport,
  type IPopularProductReport,
  type ReportData,
} from './types/reports.types.js';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async getReport(type: ReportType, period: number = 100): Promise<ReportData> {
    switch (type) {
      case ReportType.ALL_CHECKS:
        return this.getAllChecks(period);

      case ReportType.CHECKS_STATE:
        return this.getChecksState(period);

      case ReportType.AVG:
        return this.getAvg(period);

      case ReportType.POPULAR_CATEGORY:
        return this.getPopularCategory(period);

      case ReportType.POPULAR_PRODUCT:
        return this.getPopularProduct(period);

      default:
        throw new BadRequestException('Неизвестный тип отчёта');
    }
  }

  private async getAllChecks(period: number): Promise<IAllChecksReport[]> {
    return this.prisma.$queryRaw<IAllChecksReport[]>`
      SELECT
        ROW_NUMBER() OVER (
          ORDER BY
            CONCAT(sh.shop_city, ' ', sh.shop_street, ' д. ', sh.shop_house),
            DATE(co.date)
        ) AS id,
        DATE_FORMAT(co.date, '%d.%m.%Y') AS date,
        CONCAT(
          sh.shop_city, ', ',
          sh.shop_street, ', д. ',
          sh.shop_house
        ) AS shopAddress,
        CAST(COUNT(co.id_custom_order) AS UNSIGNED) AS ordersCount
      FROM custom_order co
      INNER JOIN shop sh
        ON sh.id_shop = co.id_shop
      WHERE co.date >= DATE_SUB(NOW(), INTERVAL ${period} DAY)
      GROUP BY
        sh.id_shop,
        DATE(co.date)
      ORDER BY
        shopAddress,
        DATE(co.date);
    `;
  }

  private async getChecksState(period: number): Promise<IChecksStateReport[]> {
    return this.prisma.$queryRaw<IChecksStateReport[]>`
      SELECT
        ROW_NUMBER() OVER (
          ORDER BY
            shopAddress,
            DATE(co.date)
        ) AS id,
        DATE_FORMAT(co.date, '%d.%m.%Y') AS date,
        CONCAT(
          sh.shop_city, ', ',
          sh.shop_street, ', д. ',
          sh.shop_house
        ) AS shopAddress,
        CAST(
          COUNT(DISTINCT CASE
            WHEN co.id_status IN (2, 3, 4, 5)
            THEN co.id_custom_order
          END) AS UNSIGNED
        ) AS completedOrders,
        CAST(
          COUNT(DISTINCT CASE
            WHEN i.id_invoice_type = 3
            THEN co.id_custom_order
          END) AS UNSIGNED
        ) AS cancelledOrders
      FROM custom_order co
      INNER JOIN shop sh ON sh.id_shop = co.id_shop
      LEFT JOIN invoice i ON i.id_custom_order = co.id_custom_order
      WHERE co.date >= DATE_SUB(NOW(), INTERVAL ${period} DAY)
      GROUP BY sh.id_shop, DATE(co.date)
      ORDER BY shopAddress, DATE(co.date);
    `;
  }

  private async getAvg(period: number): Promise<IAvgReport[]> {
    const result = await this.prisma.$queryRaw<IAvgReport[]>`
      SELECT
        ROW_NUMBER() OVER (
          ORDER BY
            s.id_shop,
            CONCAT(
              s.shop_city, ' ',
              s.shop_street, ' д. ',
              s.shop_house
            )
        ) AS id,
        CONCAT(
          s.shop_city, ', ',
          s.shop_street, ', д. ',
          s.shop_house
        ) AS shopAddress,
        ROUND(AVG(t.orderSum), 2) AS averageOrderPrice
      FROM shop s
      INNER JOIN (
        SELECT
          co.id_shop,
          co.id_custom_order,
          SUM(oi.price * oi.quantity) AS orderSum
        FROM custom_order co
        INNER JOIN order_item oi
          ON oi.id_custom_order = co.id_custom_order
        WHERE co.date >= DATE_SUB(NOW(), INTERVAL ${period} DAY)
        GROUP BY co.id_shop, co.id_custom_order
      ) t
        ON s.id_shop = t.id_shop
      GROUP BY s.id_shop, s.shop_city, s.shop_street, s.shop_house;
    `;

    return result.map((item) => ({
      ...item,
      averageOrderPrice: Number(item.averageOrderPrice),
    }));
  }

  private async getPopularCategory(
    period: number,
  ): Promise<IPopularCategoryReport[]> {
    const result = await this.prisma.$queryRaw<IPopularCategoryReport[]>`
      SELECT
        ROW_NUMBER() OVER (
          ORDER BY SUM(oi.quantity) DESC
        ) AS id,
        c.title_category AS category,
        ROUND(SUM(oi.quantity), 2) AS quantity,
        ROUND(SUM(oi.quantity * oi.price), 2) AS revenue,
        ROUND(
          SUM(oi.quantity) / NULLIF(total.totalQty, 0) * 100,
          2
        ) AS salesShare
      FROM category c
      INNER JOIN product p
        ON p.id_category = c.id_category
      INNER JOIN order_item oi
        ON oi.id_product = p.id_product
      INNER JOIN custom_order co
        ON co.id_custom_order = oi.id_custom_order
      CROSS JOIN (
        SELECT SUM(oi2.quantity) AS totalQty
        FROM order_item oi2
        INNER JOIN custom_order co2
          ON co2.id_custom_order = oi2.id_custom_order
        WHERE co2.date >= DATE_SUB(NOW(), INTERVAL ${period} DAY)
      ) total
      WHERE co.date >= DATE_SUB(NOW(), INTERVAL ${period} DAY)
      GROUP BY c.id_category, c.title_category, total.totalQty
      HAVING SUM(oi.quantity) > 0
      ORDER BY SUM(oi.quantity) DESC;
    `;

    return result.map((item) => ({
      ...item,
      quantity: Number(item.quantity),
      revenue: Number(item.revenue),
      salesShare: Number(item.salesShare ?? 0),
    }));
  }

  private async getPopularProduct(
    period: number,
  ): Promise<IPopularProductReport[]> {
    const result = await this.prisma.$queryRaw<IPopularProductReport[]>`
      SELECT
        ROW_NUMBER() OVER (
          ORDER BY SUM(oi.quantity) DESC
        ) AS id,
        p.title_product AS product,
        CONCAT(
          CASE
            WHEN u.title_unit_short IN ('кг', 'г', 'л')
              THEN ROUND(SUM(oi.quantity), 2)
            ELSE ROUND(SUM(oi.quantity), 0)
          END,
          ' ',
          u.title_unit_short
        ) AS soldQuantity,
        ROUND(SUM(oi.quantity * oi.price), 2) AS revenue
      FROM order_item oi
      INNER JOIN product p
        ON p.id_product = oi.id_product
      INNER JOIN unit u
        ON u.id_unit = p.id_unit
      INNER JOIN custom_order co
        ON co.id_custom_order = oi.id_custom_order
      WHERE co.date >= DATE_SUB(NOW(), INTERVAL ${period} DAY)
      GROUP BY p.id_product, p.title_product, u.title_unit_short
      ORDER BY SUM(oi.quantity) DESC;
    `;

    return result.map((item) => ({
      ...item,
      revenue: Number(item.revenue),
    }));
  }
}

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
import { ExcelService } from '../excel/excel.service.js';

@Injectable()
export class ReportsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly excelService: ExcelService,
  ) {}

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
    const result = await this.prisma.$queryRaw<IAllChecksReport[]>`
    SELECT
      CAST(
        ROW_NUMBER() OVER (
          ORDER BY report.shopAddress, report.reportDate
        ) AS UNSIGNED
      ) AS id,
      DATE_FORMAT(report.reportDate, '%d.%m.%Y') AS date,
      report.shopAddress,
      CAST(report.ordersCount AS UNSIGNED) AS ordersCount
    FROM (
      SELECT
        co.id_shop,
        DATE(co.date) AS reportDate,
        CONCAT(
          sh.shop_city, ', ',
          sh.shop_street, ', д. ',
          sh.shop_house
        ) AS shopAddress,
        COUNT(co.id_custom_order) AS ordersCount
      FROM custom_order co
      INNER JOIN shop sh
        ON sh.id_shop = co.id_shop
      WHERE co.date >= DATE_SUB(NOW(), INTERVAL ${period} DAY)
      GROUP BY co.id_shop, DATE(co.date), sh.shop_city, sh.shop_street, sh.shop_house
    ) AS report
    ORDER BY report.shopAddress, report.reportDate;
  `;
    return result.map((item) => ({
      ...item,
      id: Number(item.id),
      ordersCount: Number(item.ordersCount),
    }));
  }

  private async getChecksState(period: number): Promise<IChecksStateReport[]> {
    const result = await this.prisma.$queryRaw<IChecksStateReport[]>`
      SELECT
        CAST(
          ROW_NUMBER() OVER (
            ORDER BY
              sh.shop_city,
              sh.shop_street,
              sh.shop_house,
              DATE(co.date)
          ) AS UNSIGNED
        ) AS id,
        DATE_FORMAT(co.date, '%d.%m.%Y') AS date,
        CONCAT(
          sh.shop_city, ', ',
          sh.shop_street, ', д. ',
          sh.shop_house
        ) AS shopAddress,
        CAST(
          SUM(
            CASE
              WHEN co.id_status IN (2, 3, 4, 5) THEN 1
              ELSE 0
            END
          ) AS UNSIGNED
        ) AS completedOrders,
        CAST(
          SUM(
            CASE
              WHEN EXISTS (
                SELECT 1
                FROM invoice i
                WHERE i.id_custom_order = co.id_custom_order
                  AND i.id_invoice_type = 3
              ) THEN 1
              ELSE 0
            END
          ) AS UNSIGNED
        ) AS cancelledOrders
      FROM custom_order co
      INNER JOIN shop sh
        ON sh.id_shop = co.id_shop
      WHERE co.date >= DATE_SUB(NOW(), INTERVAL ${period} DAY)
      GROUP BY sh.id_shop, sh.shop_city, sh.shop_street, sh.shop_house, DATE(co.date), co.date
      ORDER BY sh.shop_city, sh.shop_street, sh.shop_house, DATE(co.date);
    `;
    return result.map((item) => ({
      ...item,
      id: Number(item.id),
      completedOrders: Number(item.completedOrders),
      cancelledOrders: Number(item.cancelledOrders),
    }));
  }

  private async getAvg(period: number): Promise<IAvgReport[]> {
    const result = await this.prisma.$queryRaw<IAvgReport[]>`
      SELECT
        CAST(
          ROW_NUMBER() OVER (
            ORDER BY s.id_shop
          ) AS UNSIGNED
        ) AS id,
        CONCAT(
          s.shop_city, ', ',
          s.shop_street, ', д. ',
          s.shop_house
        ) AS shopAddress,
        CAST(
          ROUND(AVG(t.orderSum), 2) AS DECIMAL(12, 2)
        ) AS averageOrderPrice
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
        GROUP BY
          co.id_shop,
          co.id_custom_order
      ) t ON s.id_shop = t.id_shop
      GROUP BY s.id_shop, s.shop_city, s.shop_street, s.shop_house;
    `;

    return result.map((item) => ({
      ...item,
      id: Number(item.id),
      averageOrderPrice: Number(item.averageOrderPrice),
    }));
  }

  private async getPopularCategory(
    period: number,
  ): Promise<IPopularCategoryReport[]> {
    const result = await this.prisma.$queryRaw<IPopularCategoryReport[]>`
      SELECT
        CAST(
          ROW_NUMBER() OVER (
            ORDER BY SUM(oi.quantity) DESC, c.id_category
          ) AS UNSIGNED
        ) AS id,
        c.title_category AS category,
        CAST(
          ROUND(SUM(oi.quantity), 2) AS DECIMAL(12, 2)
        ) AS quantity,
        CAST(
          ROUND(SUM(oi.quantity * oi.price), 2) AS DECIMAL(12, 2)
        ) AS revenue,
        CAST(
          ROUND(
            SUM(oi.quantity) / NULLIF(MAX(total.totalQty), 0) * 100,
            2
          ) AS DECIMAL(12, 2)
        ) AS salesShare
      FROM category c
      INNER JOIN product p
        ON p.id_category = c.id_category
      INNER JOIN order_item oi
        ON oi.id_product = p.id_product
      INNER JOIN custom_order co
        ON co.id_custom_order = oi.id_custom_order
      CROSS JOIN (
        SELECT
          SUM(oi2.quantity) AS totalQty
        FROM order_item oi2
        INNER JOIN custom_order co2
          ON co2.id_custom_order = oi2.id_custom_order
        WHERE co2.date >= DATE_SUB(NOW(), INTERVAL ${period} DAY)
      ) total
      WHERE co.date >= DATE_SUB(NOW(), INTERVAL ${period} DAY)
      GROUP BY c.id_category, c.title_category
      HAVING SUM(oi.quantity) > 0
      ORDER BY SUM(oi.quantity) DESC, c.id_category;
    `;

    return result.map((item) => ({
      ...item,
      id: Number(item.id),
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
        CAST(
          ROW_NUMBER() OVER (
            ORDER BY SUM(oi.quantity) DESC, p.id_product
          ) AS UNSIGNED
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
        CAST(
          ROUND(SUM(oi.quantity * oi.price), 2) AS DECIMAL(12, 2)
        ) AS revenue
      FROM order_item oi
      INNER JOIN product p
        ON p.id_product = oi.id_product
      INNER JOIN unit u
        ON u.id_unit = p.id_unit
      INNER JOIN custom_order co
        ON co.id_custom_order = oi.id_custom_order
      WHERE co.date >= DATE_SUB(NOW(), INTERVAL ${period} DAY)
      GROUP BY p.id_product, p.title_product, u.title_unit_short
      ORDER BY SUM(oi.quantity) DESC, p.id_product;
    `;

    return result.map((item) => ({
      ...item,
      id: Number(item.id),
      revenue: Number(item.revenue),
    }));
  }

  async exportAllChecksExcel(period: number = 100): Promise<Buffer> {
    const data = await this.getAllChecks(period);

    return this.excelService.generateExcel(
      'Все заказы',
      [
        { header: '№', key: 'id', width: 10 },
        { header: 'Дата', key: 'date', width: 20 },
        { header: 'Магазин', key: 'shopAddress', width: 40 },
        { header: 'Количество заказов', key: 'ordersCount', width: 25 },
      ],
      data,
    );
  }

  async exportChecksStateExcel(period: number = 100): Promise<Buffer> {
    const data = await this.getChecksState(period);

    return this.excelService.generateExcel(
      'Состояние заказов',
      [
        { header: '№', key: 'id', width: 10 },
        { header: 'Дата', key: 'date', width: 20 },
        { header: 'Магазин', key: 'shopAddress', width: 40 },
        { header: 'Выполненные заказы', key: 'completedOrders', width: 25 },
        { header: 'Отменённые заказы', key: 'cancelledOrders', width: 25 },
      ],
      data,
    );
  }

  async exportAvgExcel(period: number = 100): Promise<Buffer> {
    const data = await this.getAvg(period);

    return this.excelService.generateExcel(
      'Средний чек',
      [
        { header: '№', key: 'id', width: 10 },
        { header: 'Магазин', key: 'shopAddress', width: 40 },
        {
          header: 'Средняя стоимость заказа',
          key: 'averageOrderPrice',
          width: 30,
        },
      ],
      data,
    );
  }

  async exportPopularCategoryExcel(period: number = 100): Promise<Buffer> {
    const data = await this.getPopularCategory(period);
    return this.excelService.generateExcel(
      'Популярные категории',
      [
        { header: '№', key: 'id', width: 10 },
        { header: 'Категория', key: 'category', width: 30 },
        { header: 'Количество продаж', key: 'quantity', width: 20 },
        { header: 'Выручка', key: 'revenue', width: 20 },
        { header: 'Доля продаж (%)', key: 'salesShare', width: 20 },
      ],
      data,
    );
  }

  async exportPopularProductExcel(period: number = 100): Promise<Buffer> {
    const data = await this.getPopularProduct(period);
    return this.excelService.generateExcel(
      'Популярные товары',
      [
        { header: '№', key: 'id', width: 10 },
        { header: 'Товар', key: 'product', width: 40 },
        {
          header: 'Количество проданных единиц',
          key: 'soldQuantity',
          width: 30,
        },
        { header: 'Выручка', key: 'revenue', width: 20 },
      ],
      data,
    );
  }
}

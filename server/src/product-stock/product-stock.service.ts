import { BadRequestException, Injectable } from '@nestjs/common';
import { IOrderItem } from '../order-items/interfaces/order-item.interface.js';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { GetProductStockQueryDto } from './dto/get-product-stock-query.dto.js';
import { FilterProductStockDto } from './dto/filter-product-stock.dto.js';

@Injectable()
export class ProductStockService {
  constructor(private readonly prisma: PrismaService) {}

  async reserveStock(
    shopId: number,
    products: IOrderItem[],
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;
    for (const product of products) {
      const { productId, quantity } = product;

      const oldStock = await client.productStock.findUnique({
        where: {
          productId_shopId: { productId, shopId },
        },
      });

      if (
        product.quantity >
        Number(oldStock?.quantity ?? 0) -
          Number(oldStock?.reservedQuantity ?? 0)
      ) {
        throw new BadRequestException(
          'Insufficient stock for the requested quantity',
        );
      }

      await client.productStock.update({
        where: {
          productId_shopId: { productId, shopId },
        },
        data: {
          reservedQuantity: Number(oldStock?.reservedQuantity ?? 0) + quantity,
        },
      });
    }
  }

  async deductStock(
    shopId: number,
    products: IOrderItem[],
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;
    for (const product of products) {
      const { productId, quantity } = product;

      const oldStock = await client.productStock.findUnique({
        where: {
          productId_shopId: { productId, shopId },
        },
      });

      await client.productStock.update({
        where: {
          productId_shopId: { productId, shopId },
        },
        data: {
          quantity: Number(oldStock?.quantity ?? 0) - quantity,
          reservedQuantity: Number(oldStock?.reservedQuantity ?? 0) - quantity,
        },
      });
    }
  }

  async releaseStock(
    shopId: number,
    products: IOrderItem[],
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;
    for (const product of products) {
      const { productId, quantity } = product;

      const oldStock = await client.productStock.findUnique({
        where: {
          productId_shopId: { productId, shopId },
        },
      });

      await client.productStock.update({
        where: {
          productId_shopId: { productId, shopId },
        },
        data: {
          reservedQuantity: Number(oldStock?.reservedQuantity ?? 0) - quantity,
        },
      });
    }
  }

  async restock(
    shopId: number,
    products: IOrderItem[],
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;
    for (const product of products) {
      const { productId, quantity } = product;

      const oldStock = await client.productStock.findUnique({
        where: {
          productId_shopId: { productId, shopId },
        },
      });
      await client.productStock.update({
        where: {
          productId_shopId: { productId, shopId },
        },
        data: {
          quantity: Number(oldStock?.quantity ?? 0) + quantity,
        },
      });
    }
  }

  async getAll(query: GetProductStockQueryDto) {
    const { page, limit, ...filters } = query;

    const where = this.buildFilters(filters);

    const [total, productStocks] = await Promise.all([
      this.prisma.productStock.count({ where }),
      this.prisma.productStock.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      page,
      limit,
      total,
      totalPages,
      data: productStocks,
    };
  }

  getByProductAndShop(productId: number, shopId: number) {
    return this.prisma.productStock.findUnique({
      where: {
        productId_shopId: {
          productId,
          shopId,
        },
      },
    });
  }

  getAllByShop(shopId: number) {
    return this.prisma.productStock.findMany({
      where: {
        shopId,
      },
    });
  }

  private buildFilters(
    filters: FilterProductStockDto,
  ): Prisma.ProductStockWhereInput {
    const { quantityFrom, quantityTo, productId, shopId } = filters;
    const where: Prisma.ProductStockWhereInput = {
      productId,
      shopId,
    };

    if (quantityFrom !== undefined || quantityTo !== undefined) {
      where.quantity = {
        lte: quantityTo,
        gte: quantityFrom,
      };
    }

    return where;
  }

  removeByShopId(shopId: number, tx?: Prisma.TransactionClient) {
    const client = tx ?? this.prisma;
    return client.productStock.deleteMany({
      where: { shopId },
    });
  }
}

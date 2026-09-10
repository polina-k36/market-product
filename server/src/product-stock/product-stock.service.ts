import { BadRequestException, Injectable } from '@nestjs/common';
import { IOrderItem } from '../order-items/interfaces/order-item.interface.js';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

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
}

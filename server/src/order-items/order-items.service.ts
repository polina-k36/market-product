import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { IOrderItem } from './interfaces/order-item.interface.js';

@Injectable()
export class OrderItemsService {
  constructor(private readonly prisma: PrismaService) {}

  createMany(
    items: IOrderItem[],
    orderId: number,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;
    return client.orderItem.createMany({
      data: items.map((item) => ({
        orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    });
  }

  getAllByOrderId(orderId: number) {
    return this.prisma.orderItem.findMany({
      where: { orderId },
    });
  }
}

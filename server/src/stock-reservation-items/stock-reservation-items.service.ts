import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateStockReservationItemDto } from './dto/create-stock-reservation-item.dto.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class StockReservationItemsService {
  constructor(private readonly prisma: PrismaService) {}

  create(
    reservationId: number,
    item: CreateStockReservationItemDto,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;
    return client.stockReservationItem.create({
      data: {
        quantity: item.quantity,
        productId: item.productId,
        reservationId,
      },
    });
  }

  createMany(
    reservationId: number,
    items: CreateStockReservationItemDto[],
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;
    return client.stockReservationItem.createMany({
      data: items.map((item) => ({
        quantity: item.quantity,
        productId: item.productId,
        reservationId,
      })),
    });
  }

  removeByReservationId(reservationId: number, tx?: Prisma.TransactionClient) {
    const client = tx ?? this.prisma;
    return client.stockReservationItem.deleteMany({
      where: {
        reservationId,
      },
    });
  }
}

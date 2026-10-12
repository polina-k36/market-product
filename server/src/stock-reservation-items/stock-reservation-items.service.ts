import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findByReservationAndProduct(
    reservationId: number,
    productId: number,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;
    const item = await client.stockReservationItem.findUnique({
      where: {
        reservationId_productId: {
          reservationId,
          productId,
        },
      },
    });
    if (!item) throw new NotFoundException('Reservation item is not found.');
    return item;
  }

  async removeByReservationAndProduct(
    reservationId: number,
    productId: number,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;
    const item = await client.stockReservationItem.findUnique({
      where: {
        reservationId_productId: {
          reservationId,
          productId,
        },
      },
    });
    if (!item) throw new NotFoundException('Reservation item is not found.');
    return client.stockReservationItem.delete({
      where: {
        reservationId_productId: {
          reservationId,
          productId,
        },
      },
    });
  }

  async changeCountProduct(
    reservationId: number,
    productId: number,
    quantityChange: number | { decrement: number } | { increment: number },
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;
    const item = await client.stockReservationItem.findUnique({
      where: {
        reservationId_productId: {
          reservationId,
          productId,
        },
      },
    });
    if (!item) throw new NotFoundException('Reservation item is not found.');

    return client.stockReservationItem.update({
      where: {
        reservationId_productId: {
          reservationId,
          productId,
        },
      },
      data: {
        quantity: quantityChange,
      },
    });
  }

  removeAllByReservationId(
    reservationId: number,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;
    return client.stockReservationItem.deleteMany({
      where: {
        reservationId,
      },
    });
  }
}

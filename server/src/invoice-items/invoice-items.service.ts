import { Injectable } from '@nestjs/common';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto.js';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class InvoiceItemsService {
  constructor(private readonly prisma: PrismaService) {}

  createMany(
    items: CreateInvoiceItemDto[],
    invoiceId: number,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;
    return client.invoiceItem.createMany({
      data: items.map((item) => ({
        invoiceId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOutgoingInvoiceDto } from './dto/create-outgoing-invoice.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { InvoiceTypeEnum } from '../common/enums/invoice-type.enum.js';
import { ICreateInvoice } from './interfaces/invoice.interface.js';
import { CreateIncomingInvoiceDto } from './dto/create-incoming-invoice.dto.js';
import { CreateReturnInvoiceDto } from './dto/create-return-invoice.dto.js';
import { InvoiceItemsService } from '../invoice-items/invoice-items.service.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly invoiceItemsService: InvoiceItemsService,
  ) {}

  createOutgoingInvoice(
    createInvoice: CreateOutgoingInvoiceDto,
    tx?: Prisma.TransactionClient,
  ) {
    return this.create(createInvoice, InvoiceTypeEnum.OUTGOING, tx);
  }

  createIncomingInvoice(
    createInvoice: CreateIncomingInvoiceDto,
    tx?: Prisma.TransactionClient,
  ) {
    return this.create(createInvoice, InvoiceTypeEnum.INCOMING, tx);
  }

  createReturnInvoice(
    createInvoice: CreateReturnInvoiceDto,
    tx?: Prisma.TransactionClient,
  ) {
    return this.create(createInvoice, InvoiceTypeEnum.RETURN, tx);
  }

  async create(
    createInvoice: ICreateInvoice,
    invoiceTypeId: number,
    tx?: Prisma.TransactionClient,
  ) {
    const { products, ...invoiceData } = createInvoice;
    if (tx) {
      const invoice = await tx.invoice.create({
        data: {
          date: new Date(),
          invoiceTypeId,
          ...invoiceData,
        },
      });
      await this.invoiceItemsService.createMany(products, invoice.id, tx);
      return invoice;
    }
    return this.prisma.$transaction(async (tx) => {
      const invoice = await tx.invoice.create({
        data: {
          date: new Date(),
          invoiceTypeId,
          ...invoiceData,
        },
      });
      await this.invoiceItemsService.createMany(products, invoice.id, tx);
      return invoice;
    });
  }

  getOutgoingInvoiceByOrderId(orderId: number, tx?: Prisma.TransactionClient) {
    const client = tx ?? this.prisma;
    return client.invoice.findFirst({
      where: { orderId, invoiceTypeId: InvoiceTypeEnum.OUTGOING },
    });
  }

  getReturnInvoicesByOrderId(orderId: number) {
    return this.prisma.invoice.findMany({
      where: { orderId, invoiceTypeId: InvoiceTypeEnum.RETURN },
      include: {
        invoiceItems: {
          select: {
            productId: true,
            quantity: true,
          },
        },
      },
    });
  }

  async getById(id: number) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
    });
    if (!invoice) throw new NotFoundException('Invoice not found.');
    return invoice;
  }
}

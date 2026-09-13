import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOutgoingInvoiceDto } from './dto/create-outgoing-invoice.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { InvoiceTypeEnum } from '../common/enums/invoice-type.enum.js';
import { ICreateInvoice } from './interfaces/invoice.interface.js';
import { CreateIncomingInvoiceDto } from './dto/create-incoming-invoice.dto.js';
import { CreateReturnInvoiceDto } from './dto/create-return-invoice.dto.js';
import { InvoiceItemsService } from '../invoice-items/invoice-items.service.js';
import { Prisma } from '../generated/prisma/client.js';
import { GetInvoicesQueryDto } from './dto/get-invoices-query.dto.js';
import { FilterInvoicesDto } from './dto/filter-invoices.dto.js';
import { ProductStockService } from '../product-stock/product-stock.service.js';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly invoiceItemsService: InvoiceItemsService,
    private readonly productStock: ProductStockService,
  ) {}

  createOutgoingInvoice(
    createInvoice: CreateOutgoingInvoiceDto,
    tx?: Prisma.TransactionClient,
  ) {
    return this.create(createInvoice, InvoiceTypeEnum.OUTGOING, tx);
  }

  createIncomingInvoiceAndRestock(createInvoice: CreateIncomingInvoiceDto) {
    return this.prisma.$transaction(async (tx) => {
      const invoice = await this.create(
        createInvoice,
        InvoiceTypeEnum.INCOMING,
        tx,
      );
      await this.productStock.restock(
        createInvoice.shopId,
        createInvoice.products,
        tx,
      );
      return invoice;
    });
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
      include: { invoiceItems: true },
    });
    if (!invoice) throw new NotFoundException('Invoice not found.');
    return invoice;
  }

  async getAll(query: GetInvoicesQueryDto) {
    const { page, limit, ...filters } = query;

    const where = this.buildFilters(filters);

    const [total, invoices] = await Promise.all([
      this.prisma.invoice.count({ where }),
      this.prisma.invoice.findMany({
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
      data: invoices,
    };
  }

  buildFilters(filters: FilterInvoicesDto): Prisma.InvoiceWhereInput {
    const { supplierId, invoiceTypeId, shopId, dateFrom, dateTo } = filters;
    const where: Prisma.InvoiceWhereInput = {
      supplierId,
      invoiceTypeId,
      shopId,
    };

    if (dateFrom || dateTo) {
      where.date = {
        lte: dateTo,
        gte: dateFrom,
      };
    }

    return where;
  }
}

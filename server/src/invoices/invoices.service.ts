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
import { PdfInvoiceData } from '../pdf/interfaces/pdf.interfaces.js';
import { PdfService } from '../pdf/pdf.service.js';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly invoiceItemsService: InvoiceItemsService,
    private readonly productStock: ProductStockService,
    private readonly pdfService: PdfService,
  ) {}

  createOutgoingInvoice(
    createInvoice: CreateOutgoingInvoiceDto,
    tx?: Prisma.TransactionClient,
  ) {
    return this.create(createInvoice, Number(InvoiceTypeEnum.OUTGOING), tx);
  }

  createIncomingInvoiceAndRestock(createInvoice: CreateIncomingInvoiceDto) {
    return this.prisma.$transaction(async (tx) => {
      const invoice = await this.create(
        createInvoice,
        Number(InvoiceTypeEnum.INCOMING),
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
    return this.create(createInvoice, Number(InvoiceTypeEnum.RETURN), tx);
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
      where: { orderId, invoiceTypeId: Number(InvoiceTypeEnum.OUTGOING) },
    });
  }

  getReturnInvoicesByOrderId(orderId: number) {
    return this.prisma.invoice.findMany({
      where: { orderId, invoiceTypeId: Number(InvoiceTypeEnum.RETURN) },
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
        select: {
          id: true,
          date: true,
          supplier: {
            select: {
              title: true,
            },
          },
          invoiceType: {
            select: {
              title: true,
            },
          },
          orderId: true,
          shop: {
            select: {
              city: true,
              street: true,
              house: true,
            },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      page,
      limit,
      total,
      totalPages,
      data: invoices.map((invoice) => ({
        ...invoice,
        shop: `${invoice.shop.street}, ${invoice.shop.house}, ${invoice.shop.city}`,
        invoiceType: invoice.invoiceType.title,
        supplier: invoice.supplier ? invoice.supplier.title : null,
      })),
    };
  }

  buildFilters(filters: FilterInvoicesDto): Prisma.InvoiceWhereInput {
    const { supplierId, invoiceTypeId, shopId, dateFrom, dateTo } = filters;
    const where: Prisma.InvoiceWhereInput = {
      supplierId,
      invoiceTypeId: Number(invoiceTypeId),
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

  async exportInvoicePdf(id: number): Promise<Buffer> {
    const invoice = await this.prisma.invoice.findUnique({
      where: {
        id,
      },
      include: {
        shop: true,
        supplier: true,
        invoiceType: true,
        invoiceItems: {
          include: {
            product: {
              include: {
                unit: true,
              },
            },
          },
        },
      },
    });

    if (!invoice) throw new NotFoundException('Invoice not found.');

    const pdfData: PdfInvoiceData = {
      id: invoice.id,
      date: invoice.date,
      invoiceType: invoice.invoiceType.title,

      shopAddress: `${invoice.shop.city} ${invoice.shop.street} д. ${invoice.shop.house}`,

      supplier: invoice.supplier?.title ?? null,

      items: invoice.invoiceItems.map((item) => {
        const unit = item.product.unit.shortTitle;

        const quantity = ['кг', 'г', 'л'].includes(unit)
          ? Number(item.quantity.toFixed(2))
          : Math.round(Number(item.quantity));

        return {
          title: item.product.title,
          quantity: `${quantity} ${unit}`,
          price: Number(item.price),
          sum: Number(item.quantity) * Number(item.price),
        };
      }),
    };

    return this.pdfService.generateInvoicePdf(pdfData);
  }
}

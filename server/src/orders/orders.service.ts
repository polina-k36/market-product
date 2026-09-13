import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProductsService } from '../products/products.service.js';
import { IOrderItem } from '../order-items/interfaces/order-item.interface.js';
import { OrderItemsService } from '../order-items/order-items.service.js';
import { ProductStockService } from '../product-stock/product-stock.service.js';
import { InvoicesService } from '../invoices/invoices.service.js';
import { OrderStatusEnum } from '../common/enums/order-status.enum.js';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto.js';
import { ReturnOrderDto } from './dto/return-order.dto.js';
import { GetOrdersQueryDto } from './dto/get-orders-query.dto.js';
import { FilterOrdersDto } from './dto/filter-orders.dto.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsService: ProductsService,
    private readonly orderItemsService: OrderItemsService,
    private readonly productStockService: ProductStockService,
    private readonly invoicesService: InvoicesService,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    let totalPrice = 0;
    const orderItemsData: IOrderItem[] = [];

    const { products, ...orderData } = createOrderDto;

    return this.prisma.$transaction(async (tx) => {
      for (const product of products) {
        const productWithPrice = await this.productsService.getProductPriceById(
          product.productId,
          tx,
        );

        if (!productWithPrice) throw new NotFoundException('Product not found');
        orderItemsData.push({
          ...product,
          price: +productWithPrice.price,
        });
        totalPrice += product.quantity * +productWithPrice.price;
      }
      const order = await tx.order.create({
        data: {
          userId,
          totalPrice,
          date: new Date(),
          statusId: 1,
          ...orderData,
        },
      });
      const orderItems = await this.orderItemsService.createMany(
        orderItemsData,
        order.id,
        tx,
      );

      await this.productStockService.reserveStock(
        order.shopId,
        orderItemsData,
        tx,
      );

      return {
        ...order,
        items: orderItems,
      };
    });
  }

  async findAll(query: GetOrdersQueryDto) {
    const { page, limit, ...filters } = query;
    const where = this.buildFilters(filters);

    const [total, orders] = await Promise.all([
      this.prisma.order.count({ where }),
      this.prisma.order.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = total / limit;

    return {
      success: true,
      page,
      limit,
      total,
      totalPages,
      data: orders,
    };
  }

  buildFilters(filters: FilterOrdersDto): Prisma.OrderWhereInput {
    const {
      shopId,
      statusId,
      paymentMethodId,
      userId,
      dateFrom,
      dateTo,
      deliveryMethodId,
    } = filters;

    const where: Prisma.OrderWhereInput = {
      shopId,
      statusId,
      paymentMethodId,
      userId,
      deliveryMethodId,
    };

    if (dateFrom || dateTo) {
      where.date = {
        lte: dateTo,
        gte: dateFrom,
      };
    }
    return where;
  }

  getByUserId(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
    });
  }

  async changeOrderStatus(id: number, dtoChangeStatus: ChangeOrderStatusDto) {
    const { statusId } = dtoChangeStatus;

    if (statusId === OrderStatusEnum.CANCELLED)
      throw new BadRequestException(
        'Cannot change status to "Cancelled". Use the cancelOrder method instead.',
      );

    if (
      statusId < OrderStatusEnum.CONFIRMED ||
      statusId > OrderStatusEnum.DELIVERED
    )
      throw new BadRequestException('Invalid status ID');

    const order = await this.findById(id, 0, 'ADMIN');

    if (statusId !== order.statusId + 1)
      throw new BadRequestException('Invalid status transition');

    if (statusId === OrderStatusEnum.SHIPPED) {
      const products: IOrderItem[] = order.orderItems.map((item) => ({
        productId: item.productId,
        quantity: +item.quantity,
        price: +item.price,
      }));
      return this.prisma.$transaction(async (tx) => {
        await this.invoicesService.createOutgoingInvoice(
          {
            orderId: order.id,
            shopId: order.shopId,
            products,
          },
          tx,
        );
        await this.productStockService.deductStock(order.shopId, products, tx);
        return tx.order.update({
          where: { id },
          data: { statusId },
        });
      });
    }

    return this.prisma.order.update({
      where: { id },
      data: { statusId },
    });
  }

  cancelOrder(id: number, userId: number) {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id, userId },
        include: { orderItems: true },
      });
      if (!order) throw new NotFoundException('Order not found.');
      const products = order.orderItems.map((item) => ({
        productId: item.productId,
        quantity: +item.quantity,
        price: +item.price,
      }));
      if (order.statusId >= 3)
        throw new BadRequestException(
          'Order cannot be cancelled after preparation has started.',
        );
      await this.productStockService.releaseStock(order.shopId, products, tx);
      const updatedOrder = await tx.order.update({
        where: { id, userId },
        data: { statusId: 6 },
        include: { orderItems: true },
      });
      return updatedOrder;
    });
  }

  async returnOrder(
    id: number,
    userId: number,
    dtoReturnOrder: ReturnOrderDto,
  ) {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id, userId },
        include: { orderItems: true },
      });
      if (!order) throw new NotFoundException('Order not found.');
      if (order.statusId !== OrderStatusEnum.DELIVERED) {
        throw new BadRequestException(
          'The order must be delivered before a return can be requested.',
        );
      }

      const invoice = await this.invoicesService.getOutgoingInvoiceByOrderId(
        id,
        tx,
      );
      if (!invoice)
        throw new BadRequestException(
          'The order has not been shipped yet, so the items have not been deducted from stock. Use the /orders/:id/cancel endpoint to cancel the order.',
        );

      const availableForReturn: { productId: number; quantity: number }[] = [];
      for (const item of order.orderItems) {
        availableForReturn.push({
          productId: item.productId,
          quantity: +item.quantity,
        });
      }

      const returnInvoices =
        await this.invoicesService.getReturnInvoicesByOrderId(id);

      for (const inv of returnInvoices) {
        for (const item of inv.invoiceItems) {
          const product = availableForReturn.find(
            (product) => product.productId === item.productId,
          );

          if (product) {
            product.quantity -= +item.quantity;
          }
        }
      }

      for (const item of dtoReturnOrder.products) {
        const product = availableForReturn.find(
          (product) => product.productId === item.productId,
        );
        if (!product) {
          throw new NotFoundException(
            'The product is not included in this order.',
          );
        }

        if (product.quantity < item.quantity) {
          throw new BadRequestException(
            'The requested return quantity exceeds the available quantity for this product.',
          );
        }
        product.quantity -= +item.quantity;
      }

      const newReturnInvoice = await this.invoicesService.createReturnInvoice(
        {
          orderId: id,
          products: dtoReturnOrder.products,
          shopId: invoice.shopId,
        },
        tx,
      );

      await this.productStockService.restock(
        newReturnInvoice.shopId,
        dtoReturnOrder.products,
        tx,
      );
      return newReturnInvoice;
    });
  }

  async findById(id: number, userId: number, role: string) {
    const order = await this.prisma.order.findUnique({
      where: { id, userId: role === 'ADMIN' ? undefined : userId },
      include: {
        orderItems: true,
      },
    });

    if (!order) throw new NotFoundException('Order not found');

    return order;
  }

  remove(id: number) {
    return this.prisma.$transaction(async (tx) => {
      await tx.orderItem.deleteMany({
        where: { orderId: id },
      });
      return tx.order.delete({
        where: { id },
      });
    });
  }
}

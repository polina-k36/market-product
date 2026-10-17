import {
  BadRequestException,
  ConflictException,
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
import { ACTIVE_ORDER_STATUSES } from './constants/orders.constants.js';
import { StockReservationService } from '../stock-reservation/stock-reservation.service.js';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsService: ProductsService,
    private readonly orderItemsService: OrderItemsService,
    private readonly productStockService: ProductStockService,
    private readonly invoicesService: InvoicesService,
    private readonly stockReservationService: StockReservationService,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    const { reservationId, ...orderData } = createOrderDto;

    return this.prisma.$transaction(async (tx) => {
      let totalPrice = 0;
      const orderItemsData: IOrderItem[] = [];

      const reservation =
        await this.stockReservationService.getAvailableReservation(
          reservationId,
          userId,
          tx,
        );

      if (!reservation) throw new NotFoundException('Reservation not found');
      if (reservation.expiresAt <= new Date())
        throw new ConflictException(
          'Reservation has expired and is no longer available',
        );

      await this.stockReservationService.completeReservation(
        reservationId,
        userId,
        'confirm',
        tx,
      );

      for (const item of reservation.items) {
        const product = item.product;
        const productWithPrice = await this.productsService.getProductPriceById(
          product.id,
          tx,
        );

        if (!productWithPrice) throw new NotFoundException('Product not found');
        orderItemsData.push({
          productId: product.id,
          quantity: Number(item.quantity),
          price: Number(productWithPrice.price),
        });
        totalPrice += Number(item.quantity) * Number(productWithPrice.price);
      }
      const order = await tx.order.create({
        data: {
          ...orderData,
          userId,
          totalPrice,
          date: new Date(),
          statusId: OrderStatusEnum.PROCESSING,
        },
      });
      const orderItems = await this.orderItemsService.createMany(
        orderItemsData,
        order.id,
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

  async getByUserId(userId: number) {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      select: {
        id: true,
        date: true,
        deliveryCity: true,
        deliveryApartment: true,
        deliveryHouse: true,
        deliveryStreet: true,
        deliveryMethod: {
          select: {
            title: true,
          },
        },
        shop: {
          select: {
            city: true,
            street: true,
            house: true,
          },
        },
        status: {
          select: {
            title: true,
          },
        },
        totalPrice: true,
        _count: {
          select: {
            orderItems: true,
          },
        },
      },
    });
    return orders.map((order) => {
      const { _count, status, deliveryMethod, ...dataOrder } = order;
      return {
        ...dataOrder,
        status: status.title,
        deliveryMethod: deliveryMethod.title,
        itemCount: _count.orderItems,
      };
    });
  }

  //FIXME: посмотреть и поправить работу с id статусами заказов
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
      if (order.statusId > OrderStatusEnum.PREPARING)
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

  async findByIdForUser(id: number, userId: number, role: string) {
    const order = await this.prisma.order.findUnique({
      where: { id, userId: role === 'ADMIN' ? undefined : userId },
      select: {
        id: true,
        date: true,
        status: {
          select: {
            title: true,
          },
        },
        deliveryApartment: true,
        deliveryCity: true,
        deliveryHouse: true,
        deliveryStreet: true,
        shop: {
          select: {
            city: true,
            street: true,
            house: true,
          },
        },
        deliveryMethod: {
          select: {
            title: true,
          },
        },
        paymentMethod: {
          select: {
            title: true,
          },
        },
        userCard: {
          select: {
            cardBrand: true,
            cardLast4: true,
          },
        },
        orderItems: {
          select: {
            id: true,
            quantity: true,
            price: true,
            product: {
              select: {
                id: true,
                title: true,
                description: true,
                imageKey: true,
                unit: {
                  select: {
                    shortTitle: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw new NotFoundException('Order not found');

    return {
      ...order,
      deliveryMethod: order.deliveryMethod.title,
      paymentMethod: order.paymentMethod.title,
      status: order.status.title,
    };
  }

  async findAllActiveByUserId(userId: number) {
    const orders = await this.prisma.order.findMany({
      where: {
        userId,
        status: {
          title: {
            in: ACTIVE_ORDER_STATUSES,
          },
        },
      },
      select: {
        id: true,
        date: true,
        deliveryCity: true,
        deliveryApartment: true,
        deliveryHouse: true,
        deliveryStreet: true,
        status: {
          select: {
            title: true,
          },
        },
        totalPrice: true,
        _count: {
          select: {
            orderItems: true,
          },
        },
      },
    });

    return orders.map((order) => {
      const { _count, status, ...dataOrder } = order;
      return {
        ...dataOrder,
        status: status.title,
        itemCount: _count.orderItems,
      };
    });
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

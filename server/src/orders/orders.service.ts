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

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsService: ProductsService,
    private readonly orderItemsService: OrderItemsService,
    private readonly productStockService: ProductStockService,
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

  findAll(userId: number, role: string) {
    return this.prisma.order.findMany({
      where: {
        userId: role === 'ADMIN' ? undefined : userId,
      },
    });
  }

  async changeOrderStatus(id: number, statusId: number) {
    if (statusId === 6)
      throw new BadRequestException(
        'Cannot change status to "Cancelled". Use the cancelOrder method instead.',
      );

    if (statusId < 2 || statusId > 5)
      throw new BadRequestException('Invalid status ID');

    const order = await this.findById(id, 0, 'ADMIN');

    if (statusId !== order.statusId + 1)
      throw new BadRequestException('Invalid status transition');

    if (statusId === 4) {
      //формирование накладных расхода
      const products: IOrderItem[] = order.orderItems.map((item) => ({
        productId: item.productId,
        quantity: +item.quantity,
        price: +item.price,
      }));
      return this.prisma.$transaction(async (tx) => {
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

  async returnOrder(id: number, userId: number) {}

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

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStockReservationDto } from './dto/create-stock-reservation.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProductStockService } from '../product-stock/product-stock.service.js';
import { Prisma } from '../generated/prisma/client.js';
import { StockReservationItemsService } from '../stock-reservation-items/stock-reservation-items.service.js';
import { CartsService } from '../carts/carts.service.js';

@Injectable()
export class StockReservationService {
  // удаление при окончания резервации ? авто очистка есть ои и можно ли создать
  //TODO: Конкурентное резервирование товаров
  //TODO: еще раз проверить всю логику
  constructor(
    private readonly prisma: PrismaService,
    private readonly productStockService: ProductStockService,
    private readonly stockReservationItemsService: StockReservationItemsService,
    private readonly cartsService: CartsService,
  ) {}

  async create(
    createDto: CreateStockReservationDto,
    userId: number,
    tx?: Prisma.TransactionClient,
  ) {
    if (tx) {
      return this.createInTransaction(createDto, userId, tx);
    }
    return this.prisma.$transaction(async (tx) => {
      return this.createInTransaction(createDto, userId, tx);
    });
  }

  async createFromUserCart(userId: number, shopId: number) {
    const cartItems = await this.cartsService.getCartItems(userId);
    if (cartItems.length === 0) throw new BadRequestException('Cart is empty');
    return this.create(
      {
        shopId,
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: Number(item.quantity),
        })),
      },
      userId,
    );
  }

  async getValidReservationByUserId(
    userId: number,
    tx?: Prisma.TransactionClient,
  ) {
    const usersReservations = await this.getUserReservations(userId, tx);
    let validReservation = null;

    if (usersReservations.length > 0) {
      usersReservations.forEach((reservation) => {
        if (reservation.expiresAt > new Date()) {
          validReservation = {
            //FIXME: подумать о валидности таких данных в items может кидать ошибку
            reservationId: reservation.id,
            isNew: false,
            shopId: reservation.shopId,
            items: reservation.items.map((item) => ({
              product: item.product,
              reservedQuantity: item.quantity,
              requestedQuantity: item.quantity,
              status: 'RESERVED',
            })),
          };
        }
      });
    }
    return validReservation;
  }

  async createInTransaction(
    createDto: CreateStockReservationDto,
    userId: number,
    tx: Prisma.TransactionClient,
  ) {
    let validReservation = await this.getValidReservationByUserId(userId, tx);
    if (validReservation !== null) {
      return validReservation;
    }

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); //FIXME: подумать над таймаутом резерва
    const finalItems = await this.checkAvailableStock(createDto, tx);

    //TODO: проверить и может поправить
    const reservations = finalItems
      .filter((item) => item.reservedQuantity > 0)
      .filter((item) => item.product !== undefined)
      .map((item) => ({
        quantity: item.reservedQuantity,
        productId: item.product?.id ?? 0,
      }));

    if (reservations.length > 0) {
      const reservation = await tx.stockReservation.create({
        data: {
          shopId: createDto.shopId,
          userId,
          expiresAt,
        },
        select: { id: true, shopId: true },
      });

      await this.stockReservationItemsService.createMany(
        reservation.id,
        reservations,
        tx,
      );

      await this.productStockService.reserveStock(
        createDto.shopId,
        reservations.map((reservation) => ({
          productId: reservation.productId,
          quantity: reservation.quantity,
        })),
        tx,
      );
      return {
        isNew: true,
        reservationId: reservation.id,
        shopId: reservation.shopId,
        items: finalItems,
      };
    }
    return {
      reservationId: null,
      shopId: createDto.shopId,
      items: finalItems,
    };
  }

  async checkAvailableStock(
    data: CreateStockReservationDto,
    tx?: Prisma.TransactionClient,
  ) {
    const productsMap = new Map<number, number>();

    for (const product of data.items) {
      const currentQuantity = productsMap.get(product.productId) ?? 0;
      productsMap.set(product.productId, currentQuantity + product.quantity);
    }

    const mergedProducts = Array.from(productsMap, ([productId, quantity]) => ({
      productId,
      quantity,
    }));

    const finalItems: {
      product:
        | {
            id: number;
            title: string;
            description: string;
            imageKey: string;
            price: number;
          }
        | undefined;
      requestedQuantity: number;
      reservedQuantity: number;
      status: 'PARTIALLY_RESERVED' | 'RESERVED' | 'UNAVAILABLE';
    }[] = [];

    const productStock = await this.productStockService.getAllByShop(
      data.shopId,
      tx,
    );

    mergedProducts.forEach((product) => {
      const stock = productStock.find(
        (pr) => pr.product.id === product.productId,
      );

      const availableStock =
        Number(stock?.quantity) - Number(stock?.reservedQuantity);

      if (stock === undefined || availableStock <= 0) {
        finalItems.push({
          product: stock?.product
            ? {
                ...stock.product,
                price: Number(stock.product.price),
              }
            : undefined,
          requestedQuantity: product.quantity,
          reservedQuantity: 0,
          status: 'UNAVAILABLE',
        });
      } else if (availableStock >= product.quantity) {
        finalItems.push({
          product: {
            ...stock.product,
            price: Number(stock.product.price),
          },
          requestedQuantity: product.quantity,
          reservedQuantity: product.quantity,
          status: 'RESERVED',
        });
      } else {
        finalItems.push({
          product: {
            ...stock.product,
            price: Number(stock.product.price),
          },
          requestedQuantity: product.quantity,
          reservedQuantity: availableStock,
          status: 'PARTIALLY_RESERVED',
        });
      }
    });
    return finalItems;
  }

  async getAvailableReservation(
    id: number,
    userId: number,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;
    const reservation = await client.stockReservation.findUnique({
      where: { id, userId },
      select: {
        id: true,
        shopId: true,
        expiresAt: true,
        items: {
          select: {
            product: {
              select: {
                id: true,
                title: true,
                description: true,
                imageKey: true,
                price: true,
                unit: {
                  select: {
                    shortTitle: true,
                  },
                },
                productStocks: {
                  select: {
                    quantity: true,
                    reservedQuantity: true,
                    shopId: true,
                  },
                },
              },
            },
            quantity: true,
          },
        },
      },
    });

    if (!reservation) throw new NotFoundException('Reservation is not found');

    if (reservation.expiresAt <= new Date()) {
      throw new ConflictException(
        'Reservation has expired and is no longer available',
      );
    }
    return {
      ...reservation,
      items: reservation.items.map((item) => ({
        ...item,
        product: {
          ...item.product,
          unit: item.product.unit.shortTitle,
          productStocks: item.product.productStocks.map((stock) => ({
            quantity: Number(stock.quantity) - Number(stock.reservedQuantity),
            shopId: stock.shopId,
          })),
        },
      })),
    };
  }

  async getUserReservations(userId: number, tx?: Prisma.TransactionClient) {
    const client = tx ?? this.prisma;
    const reservations = await client.stockReservation.findMany({
      where: { userId },
      select: {
        id: true,
        shopId: true,
        expiresAt: true,
        items: {
          select: {
            product: {
              select: {
                id: true,
                title: true,
                description: true,
                imageKey: true,
                price: true,
                unit: {
                  select: {
                    shortTitle: true,
                  },
                },
                productStocks: {
                  select: {
                    quantity: true,
                    reservedQuantity: true,
                    shopId: true,
                  },
                },
              },
            },
            quantity: true,
          },
        },
      },
    });
    return reservations.map((reservation) => ({
      ...reservation,
      items: reservation.items.map((item) => ({
        ...item,
        product: {
          ...item.product,
          unit: item.product.unit.shortTitle,
          productStocks: item.product.productStocks.map((stock) => ({
            quantity: Number(stock.quantity) - Number(stock.reservedQuantity),
            shopId: stock.shopId,
          })),
        },
      })),
    }));
  }

  async decrementCountProduct(
    reservationId: number,
    productId: number,
    userId: number,
    quantity: number = 1,
    tx?: Prisma.TransactionClient,
  ) {
    if (tx) {
      return this.decrementCountProductInTransaction(
        reservationId,
        productId,
        userId,
        quantity,
        tx,
      );
    }

    return this.prisma.$transaction((tx) =>
      this.decrementCountProductInTransaction(
        reservationId,
        productId,
        userId,
        quantity,
        tx,
      ),
    );
  }

  async incrementCountProduct(
    reservationId: number,
    productId: number,
    userId: number,
    quantity: number = 1,
    tx?: Prisma.TransactionClient,
  ) {
    if (tx) {
      return this.incrementCountProductInTransaction(
        reservationId,
        productId,
        userId,
        quantity,
        tx,
      );
    }

    return this.prisma.$transaction((tx) =>
      this.incrementCountProductInTransaction(
        reservationId,
        productId,
        userId,
        quantity,
        tx,
      ),
    );
  }

  private async decrementCountProductInTransaction(
    reservationId: number,
    productId: number,
    userId: number,
    quantity: number,
    tx: Prisma.TransactionClient,
  ) {
    const reservation = await this.getAvailableReservation(
      reservationId,
      userId,
      tx,
    );

    const product = await this.stockReservationItemsService.changeCountProduct(
      reservationId,
      productId,
      { decrement: quantity },
      tx,
    );

    await this.productStockService.releaseStock(
      reservation.shopId,
      [{ productId: product.productId, quantity }],
      tx,
    );

    return product;
  }

  private async incrementCountProductInTransaction(
    reservationId: number,
    productId: number,
    userId: number,
    quantity: number,
    tx: Prisma.TransactionClient,
  ) {
    const reservation = await this.getAvailableReservation(
      reservationId,
      userId,
      tx,
    );

    const availableStock = await this.checkAvailableStock(
      {
        shopId: reservation.shopId,
        items: [{ productId, quantity }],
      },
      tx,
    );
    //FIXME подумать над статусом чтобы пропускать частичное резервирование как и при создании
    if (
      availableStock.length === 0 ||
      availableStock[0].status !== 'RESERVED'
    ) {
      throw new ConflictException('Stock for this product not available');
    }

    const product = await this.stockReservationItemsService.changeCountProduct(
      reservationId,
      productId,
      { increment: quantity },
      tx,
    );

    await this.productStockService.reserveStock(
      reservation.shopId,
      [{ productId: product.productId, quantity }],
      tx,
    );

    return product;
  }

  setCountProduct(
    reservationId: number,
    productId: number,
    userId: number,
    quantity: number = 1,
  ) {
    return this.prisma.$transaction(async (tx) => {
      const item =
        await this.stockReservationItemsService.findByReservationAndProduct(
          reservationId,
          productId,
        );

      const differenceQuantity = Number(item.quantity) - quantity;

      if (differenceQuantity === 0) {
        return { message: 'Nothing changed' };
      }

      if (differenceQuantity > 0) {
        return this.decrementCountProduct(
          reservationId,
          productId,
          userId,
          differenceQuantity,
          tx,
        );
      }

      return this.incrementCountProduct(
        reservationId,
        productId,
        userId,
        Math.abs(differenceQuantity),
        tx,
      );
    });
  }

  changeShop(reservationId: number, shopId: number, userId: number) {
    return this.prisma.$transaction(async (tx) => {
      const reservation = await this.getAvailableReservation(
        reservationId,
        userId,
        tx,
      );
      //FIXME: подумать над выполнением просто функции completeReservation
      await this.productStockService.releaseStock(
        reservation.shopId,
        reservation.items.map((item) => ({
          productId: item.product?.id ?? 0,
          quantity: Number(item.quantity),
        })),
        tx,
      );

      await tx.stockReservation.delete({
        where: { id: reservationId },
      });

      const newReservation = await this.create(
        {
          shopId: shopId,
          items: reservation.items.map((item) => ({
            productId: item.product?.id ?? 0,
            quantity: Number(item.quantity),
          })),
        },
        userId,
        tx,
      );

      if (newReservation.reservationId === null) {
        throw new ConflictException(
          'No products available in the selected shop',
        );
      }

      return newReservation;
    });
  }

  completeReservation(
    reservationId: number,
    userId: number,
    action: 'cancel' | 'confirm',
    tx?: Prisma.TransactionClient,
  ) {
    if (tx) {
      return this.completeReservationInTransaction(
        reservationId,
        userId,
        action,
        tx,
      );
    } else {
      return this.prisma.$transaction(async (tx) => {
        return this.completeReservationInTransaction(
          reservationId,
          userId,
          action,
          tx,
        );
      });
    }
  }

  async completeReservationInTransaction(
    reservationId: number,
    userId: number,
    action: 'cancel' | 'confirm',
    tx: Prisma.TransactionClient,
  ) {
    const reservation = await this.getAvailableReservation(
      reservationId,
      userId,
      tx,
    );

    await this.stockReservationItemsService.removeAllByReservationId(
      reservationId,
      tx,
    );

    const products = reservation.items.map((item) => ({
      productId: item.product?.id ?? 0,
      quantity: Number(item.quantity),
    }));

    if (action === 'cancel') {
      await this.productStockService.releaseStock(
        reservation.shopId,
        products,
        tx,
      );
    }

    return tx.stockReservation.delete({
      where: { id: reservationId },
    });
  }

  //при удалении элемента из резерва нужно смотреть сколько осталось если ноль то удалять резерв
  removeOneItem(reservationId: number, productId: number, userId: number) {
    // TODO: подумать над expiresAt когда удалять и кто за это отвечает - просроченные резервы
    return this.prisma.$transaction(async (tx) => {
      const reservation = await this.getAvailableReservation(
        reservationId,
        userId,
        tx,
      );

      const item =
        await this.stockReservationItemsService.removeByReservationAndProduct(
          reservationId,
          productId,
          tx,
        );

      await this.productStockService.releaseStock(
        reservation.shopId,
        [
          {
            productId: item.productId,
            quantity: Number(item.quantity),
          },
        ],
        tx,
      );

      const newReservation = await this.getAvailableReservation(
        reservationId,
        userId,
        tx,
      );
      if (newReservation.items.length === 0) {
        await tx.stockReservation.delete({
          where: { id: reservationId },
        });
      }
      return item;
    });
  }
}

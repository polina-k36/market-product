import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateCartItemDto } from './dto/update-cart-item.dto.js';
import { ProductsService } from '../products/products.service.js';
import { AddCartItemDto } from './dto/add-cart-item.dto.js';

@Injectable()
export class CartsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsService: ProductsService,
  ) {}

  async getCartItems(userId: number) {
    const cart = await this.getOrCreateCartByUserId(userId);
    return this.prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: {
        product: true,
      },
    });
  }

  async addCartItem(
    productId: number,
    userId: number,
    dtoAddCartItem: AddCartItemDto,
  ) {
    const cart = await this.getOrCreateCartByUserId(userId);

    const product = await this.productsService.findById(productId);
    if (!product) throw new NotFoundException('Product not found');

    return this.prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      update: {
        quantity: {
          increment: dtoAddCartItem.quantity ?? 1,
        },
      },
      create: {
        cartId: cart.id,
        productId,
        quantity: dtoAddCartItem.quantity ?? 1,
      },
    });
  }

  async changeQuantityByProductId(
    productId: number,
    userId: number,
    dtoUpdateCartItem: UpdateCartItemDto,
  ) {
    const cart = await this.getOrCreateCartByUserId(userId);

    const cartItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });
    if (!cartItem) throw new NotFoundException('Product is not in the cart');

    return this.prisma.cartItem.update({
      where: { id: cartItem.id },
      data: {
        quantity: dtoUpdateCartItem.quantity,
      },
    });
  }

  async removeItemByProductId(productId: number, userId: number) {
    const cart = await this.getOrCreateCartByUserId(userId);

    const cartItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });
    if (!cartItem) throw new NotFoundException('Product is not in the cart');

    return this.prisma.cartItem.delete({
      where: { id: cartItem.id },
    });
  }

  async clearCartItems(userId: number) {
    const cart = await this.getOrCreateCartByUserId(userId);

    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
    return await this.getOrCreateCartByUserId(userId);
  }

  async getOrCreateCartByUserId(userId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { cartItems: true },
    });

    if (!cart) {
      return this.prisma.cart.create({
        data: {
          userId,
        },
        include: { cartItems: true },
      });
    }
    return cart;
  }
}

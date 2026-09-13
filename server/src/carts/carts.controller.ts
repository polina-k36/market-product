import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartsService } from './carts.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';
import { AddCartItemDto } from './dto/add-cart-item.dto.js';
import { UpdateCartItemDto } from './dto/update-cart-item.dto.js';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Carts')
@UseGuards(JwtAuthGuard)
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get('cart/items')
  @ApiOperation({
    summary: 'Получить товары корзины',
    description:
      'Возвращает все товары из корзины текущего авторизованного пользователя.',
  })
  @ApiResponse({
    status: 200,
    description: 'Товары корзины успешно получены.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  async getCartItems(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.cartsService.getCartItems(userId),
    };
  }

  @Post('cart/items/:productId')
  @ApiOperation({
    summary: 'Добавить товар в корзину',
    description:
      'Добавляет товар в корзину текущего пользователя. Если товар уже находится в корзине, его количество увеличивается.',
  })
  @ApiParam({
    name: 'productId',
    description: 'ID товара',
    example: 15,
    type: Number,
  })
  @ApiResponse({
    status: 201,
    description: 'Товар успешно добавлен в корзину.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 404,
    description: 'Товар не найден.',
  })
  async addCartItem(
    @Param('productId', ParseIntPipe) productId: number,
    @Req() req: AuthenticatedRequest,
    @Body() body: AddCartItemDto,
  ) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.cartsService.addCartItem(productId, userId, body),
    };
  }

  @Patch('cart/items/:productId')
  @ApiOperation({
    summary: 'Изменить количество товара в корзине',
    description:
      'Устанавливает новое количество указанного товара в корзине текущего пользователя.',
  })
  @ApiParam({
    name: 'productId',
    description: 'ID товара',
    example: 15,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Количество товара успешно изменено.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 404,
    description: 'Товар не найден или отсутствует в корзине.',
  })
  async changeQuantityByProductId(
    @Param('productId', ParseIntPipe) productId: number,
    @Req() req: AuthenticatedRequest,
    @Body() body: UpdateCartItemDto,
  ) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.cartsService.changeQuantityByProductId(
        productId,
        userId,
        body,
      ),
    };
  }

  @Delete('cart/items/:productId')
  @ApiOperation({
    summary: 'Удалить товар из корзины',
    description:
      'Удаляет указанную позицию товара из корзины текущего пользователя.',
  })
  @ApiParam({
    name: 'productId',
    description: 'ID товара',
    example: 15,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Товар успешно удалён из корзины.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 404,
    description: 'Товар отсутствует в корзине.',
  })
  async removeItemByProductId(
    @Param('productId', ParseIntPipe) productId: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.cartsService.removeItemByProductId(productId, userId),
    };
  }

  @Delete('cart/items')
  @ApiOperation({
    summary: 'Очистить корзину',
    description: 'Удаляет все товары из корзины текущего пользователя.',
  })
  @ApiResponse({
    status: 200,
    description: 'Корзина успешно очищена.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  async clearCartItems(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.cartsService.clearCartItems(userId),
    };
  }
}

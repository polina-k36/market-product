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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { StockReservationService } from './stock-reservation.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';
import { CreateStockReservationFromCartDto } from './dto/create-stock-reservation-from-cart.dto.js';
import { CreateStockReservationDto } from './dto/create-stock-reservation.dto.js';
import { ChangeReservationItemDto } from './dto/change-reservation-item.dto.js';
import { SetReservationItemQuantityDto } from './dto/set-reservation-item-quantity.dto.js';
import { UpdateReservationShopDto } from './dto/update-reservation-shop.dto.js';

@ApiTags('Резервирование товаров')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('stock-reservations')
export class StockReservationController {
  constructor(
    private readonly stockReservationService: StockReservationService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Получить все резервирования пользователя',
    description:
      'Возвращает информацию о всех резервированиях пользователя. Пользователь может получить только собственное доступное резервирование.',
  })
  @ApiResponse({
    status: 200,
    description: 'Резервирование успешно получено.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  async getUserReservations(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.stockReservationService.getUserReservations(userId),
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получить резервирование по ID',
    description:
      'Возвращает информацию о резервировании и его товарах. Пользователь может получить только собственное доступное резервирование.',
  })
  @ApiResponse({
    status: 200,
    description: 'Резервирование успешно получено.',
  })
  @ApiResponse({
    status: 400,
    description: 'Передан некорректный ID резервирования.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 404,
    description: 'Резервирование не найдено или недоступно.',
  })
  async getReservation(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    const reservation =
      await this.stockReservationService.getAvailableReservation(id, userId);

    return {
      success: true,
      data: {
        reservationId: reservation.id,
        shopId: reservation.shopId,
        items: reservation.items,
      },
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Создать резервирование товаров',
    description:
      'Создаёт резервирование указанных товаров в выбранном магазине с учётом доступных остатков.',
  })
  @ApiResponse({
    status: 201,
    description: 'Запрос на создание резервирования успешно обработан.',
  })
  @ApiResponse({
    status: 400,
    description: 'Переданы некорректные данные для создания резервирования.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  async create(
    @Body() createDto: CreateStockReservationDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.stockReservationService.create(createDto, userId),
    };
  }

  @Post('from-cart')
  @ApiOperation({
    summary: 'Создать резервирование из корзины',
    description:
      'Создаёт резервирование на основе товаров пользовательской корзины для выбранного магазина.',
  })
  @ApiResponse({
    status: 201,
    description:
      'Запрос на создание резервирования из корзины успешно обработан.',
  })
  @ApiResponse({
    status: 400,
    description: 'Корзина пуста или переданы некорректные данные.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  async createFromCart(
    @Body() createDto: CreateStockReservationFromCartDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.stockReservationService.createFromUserCart(
        userId,
        createDto.shopId,
      ),
    };
  }

  @Patch(':id/shop')
  async changeShop(
    @Param('id', ParseIntPipe) id: number,
    @Body() changeShopDto: UpdateReservationShopDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.stockReservationService.changeShop(
        id,
        changeShopDto.shopId,
        userId,
      ),
    };
  }

  @Patch(':id/items/:productId/decrement')
  @ApiOperation({
    summary: 'Уменьшить количество товара в резервировании',
    description:
      'Уменьшает зарезервированное количество товара на указанное значение. Если количество не передано, используется значение по умолчанию.',
  })
  @ApiResponse({
    status: 200,
    description: 'Количество товара успешно уменьшено.',
  })
  @ApiResponse({
    status: 400,
    description: 'Переданы некорректные параметры или количество.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 404,
    description: 'Резервирование или товар не найдены.',
  })
  @ApiResponse({
    status: 409,
    description: 'Невозможно уменьшить количество товара.',
  })
  async decrementCountProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('productId', ParseIntPipe) productId: number,
    @Body() changeItem: ChangeReservationItemDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.stockReservationService.decrementCountProduct(
        id,
        productId,
        userId,
        changeItem.quantity,
      ),
    };
  }

  @Patch(':id/items/:productId/increment')
  @ApiOperation({
    summary: 'Увеличить количество товара в резервировании',
    description:
      'Увеличивает зарезервированное количество товара на указанное значение с учётом доступного остатка в магазине.',
  })
  @ApiResponse({
    status: 200,
    description: 'Количество товара успешно увеличено.',
  })
  @ApiResponse({
    status: 400,
    description: 'Переданы некорректные параметры или количество.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 404,
    description: 'Резервирование или товар не найдены.',
  })
  @ApiResponse({
    status: 409,
    description: 'Недостаточно доступного остатка или изменение невозможно.',
  })
  async incrementCountProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('productId', ParseIntPipe) productId: number,
    @Body() changeItem: ChangeReservationItemDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.stockReservationService.incrementCountProduct(
        id,
        productId,
        userId,
        changeItem.quantity,
      ),
    };
  }

  @Patch(':id/items/:productId')
  @ApiOperation({
    summary: 'Установить количество товара в резервировании',
    description:
      'Устанавливает новое количество товара в резервировании с учётом доступного остатка.',
  })
  @ApiResponse({
    status: 200,
    description: 'Количество товара успешно установлено.',
  })
  @ApiResponse({
    status: 400,
    description: 'Переданы некорректные параметры или количество.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 404,
    description: 'Резервирование или товар не найдены.',
  })
  @ApiResponse({
    status: 409,
    description: 'Невозможно установить указанное количество.',
  })
  async setCountProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('productId', ParseIntPipe) productId: number,
    @Body() changeItem: SetReservationItemQuantityDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.stockReservationService.setCountProduct(
        id,
        productId,
        userId,
        changeItem.quantity,
      ),
    };
  }

  @Post(':id/confirm')
  @ApiOperation({
    summary: 'Подтвердить резервирование',
    description:
      'Подтверждает резервирование и списывает зарезервированные товары с общего остатка.',
  })
  @ApiResponse({
    status: 200,
    description: 'Резервирование успешно подтверждено.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 404,
    description: 'Резервирование не найдено.',
  })
  @ApiResponse({
    status: 409,
    description: 'Резервирование истекло или не может быть подтверждено.',
  })
  async confirmReservation(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.stockReservationService.completeReservation(
        id,
        userId,
        'confirm',
      ),
    };
  }

  @Post(':id/cancel')
  @ApiOperation({
    summary: 'Отменить резервирование',
    description:
      'Отменяет резервирование и освобождает зарезервированные остатки товаров.',
  })
  @ApiResponse({
    status: 200,
    description: 'Резервирование успешно отменено.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 404,
    description: 'Резервирование не найдено.',
  })
  @ApiResponse({
    status: 409,
    description: 'Резервирование истекло или уже недоступно.',
  })
  async cancelReservation(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.stockReservationService.completeReservation(
        id,
        userId,
        'cancel',
      ),
    };
  }

  @Delete(':id/items/:productId')
  @ApiOperation({
    summary: 'Удалить товар из резервирования',
    description:
      'Удаляет товар из резервирования и освобождает соответствующее количество зарезервированного остатка.',
  })
  @ApiResponse({
    status: 200,
    description: 'Товар успешно удалён из резервирования.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 404,
    description: 'Резервирование или товар не найдены.',
  })
  @ApiResponse({
    status: 409,
    description: 'Резервирование недоступно для изменения.',
  })
  async removeReservationItem(
    @Param('id', ParseIntPipe) id: number,
    @Param('productId', ParseIntPipe) productId: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.stockReservationService.removeOneItem(
        id,
        productId,
        userId,
      ),
    };
  }
}

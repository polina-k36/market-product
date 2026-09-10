import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { OrderItemsService } from './order-items.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@ApiTags('Order Items')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Get()
  @ApiOperation({
    summary: 'Получить список позиций заказов',
    description:
      'Возвращает список всех позиций заказов. Доступно только администратору.',
  })
  @ApiResponse({
    status: 200,
    description: 'Список позиций заказов успешно получен.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ разрешён только администратору.',
  })
  async getAll() {
    return {
      success: true,
      data: await this.orderItemsService.getAll(),
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получить позицию заказа по ID',
    description:
      'Возвращает отдельную позицию заказа по её ID. Доступно только администратору.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID позиции заказа',
    example: 25,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Позиция заказа успешно получена.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ разрешён только администратору.',
  })
  @ApiResponse({
    status: 404,
    description: 'Позиция заказа не найдена.',
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.orderItemsService.getById(id),
    };
  }
}

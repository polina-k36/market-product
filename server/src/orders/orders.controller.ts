import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';
import { EmailVerified } from '../auth/decorators/email-verified.decorator.js';
import { EmailVerifiedGuard } from '../auth/guards/email-verified.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto.js';
import { ReturnOrderDto } from './dto/return-order.dto.js';
import { GetOrdersQueryDto } from './dto/get-orders-query.dto.js';

@UseGuards(JwtAuthGuard, RolesGuard, EmailVerifiedGuard)
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @EmailVerified(true)
  @Post()
  @ApiOperation({
    summary: 'Создать заказ',
    description:
      'Создаёт новый заказ для текущего пользователя, рассчитывает итоговую стоимость, сохраняет позиции заказа и резервирует необходимое количество товаров на складе.',
  })
  @ApiBody({
    type: CreateOrderDto,
    description: 'Данные для создания заказа',
  })
  @ApiResponse({
    status: 201,
    description: 'Заказ успешно создан.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Недостаточно товара на складе или переданы некорректные данные.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description: 'Email пользователя не подтверждён.',
  })
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;
    return {
      success: true,
      data: await this.ordersService.create(userId, createOrderDto),
    };
  }

  @Get()
  @Roles('ADMIN')
  @ApiOperation({
    summary: 'Получить список заказов',
    description:
      'Возвращает список заказов с поддержкой пагинации и фильтрации. Доступно только авторизованному администратору.',
  })
  @ApiResponse({
    status: 200,
    description: 'Список заказов успешно получен.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ разрешён только администратору.',
  })
  async findAll(@Query() query: GetOrdersQueryDto) {
    return this.ordersService.findAll(query);
  }

  @Get('me')
  @ApiOperation({
    summary: 'Получить заказы текущего пользователя',
    description:
      'Возвращает список всех заказов, созданных текущим авторизованным пользователем.',
  })
  @ApiResponse({
    status: 200,
    description: 'Список заказов пользователя успешно получен.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  async getOrdersByUserId(@Req() req: AuthenticatedRequest) {
    const id = req.user.sub;

    return this.ordersService.getByUserId(id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получить заказ по ID',
    description:
      'Возвращает заказ с его позициями. Обычный пользователь может получить только собственный заказ, администратор — любой.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID заказа',
    example: 15,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Заказ успешно получен.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 404,
    description: 'Заказ не найден.',
  })
  async findById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;
    const role = req.user.role;

    return {
      success: true,
      data: await this.ordersService.findById(id, userId, role),
    };
  }

  @Roles('ADMIN')
  @EmailVerified(true)
  @Patch(':id/status')
  @ApiOperation({
    summary: 'Изменить статус заказа',
    description:
      'Изменяет статус заказа. Доступно только администратору. Статус может изменяться только последовательно в рамках установленного жизненного цикла заказа.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID заказа',
    example: 15,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Статус заказа успешно изменён.',
  })
  @ApiResponse({
    status: 400,
    description: 'Недопустимый статус или переход между статусами.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав или email пользователя не подтверждён.',
  })
  @ApiResponse({
    status: 404,
    description: 'Заказ не найден.',
  })
  async changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dtoChangeStatus: ChangeOrderStatusDto,
  ) {
    return {
      success: true,
      data: await this.ordersService.changeOrderStatus(id, dtoChangeStatus),
    };
  }

  @EmailVerified(true)
  @Post(':id/cancel')
  @ApiOperation({
    summary: 'Отменить заказ',
    description:
      'Отменяет заказ текущего пользователя. Отмена доступна до начала подготовки заказа. При отмене освобождается зарезервированное количество товара.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID заказа',
    example: 15,
    type: Number,
  })
  @ApiResponse({
    status: 201,
    description: 'Заказ успешно отменён.',
  })
  @ApiResponse({
    status: 400,
    description: 'Заказ нельзя отменить на текущем этапе.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description: 'Email пользователя не подтверждён.',
  })
  @ApiResponse({
    status: 404,
    description: 'Заказ не найден или не принадлежит текущему пользователю.',
  })
  async cancelOrder(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.ordersService.cancelOrder(id, userId),
    };
  }

  @EmailVerified(true)
  @Post(':id/return')
  @ApiOperation({
    summary: 'Оформить возврат заказа',
    description:
      'Оформляет возврат заказа текущего пользователя. При возврате товар возвращается на склад в соответствии с правилами обработки возврата.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID заказа',
    example: 15,
    type: Number,
  })
  @ApiResponse({
    status: 201,
    description: 'Возврат успешно оформлен.',
  })
  @ApiResponse({
    status: 400,
    description: 'Возврат для данного заказа невозможен.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description: 'Email пользователя не подтверждён.',
  })
  @ApiResponse({
    status: 404,
    description: 'Заказ не найден или не принадлежит текущему пользователю.',
  })
  async returnOrder(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
    @Body() dtoReturnOrder: ReturnOrderDto,
  ) {
    const userId = req.user.sub;
    return {
      success: true,
      data: await this.ordersService.returnOrder(id, userId, dtoReturnOrder),
    };
  }

  @Roles('ADMIN')
  @EmailVerified(true)
  @Delete(':id')
  @ApiOperation({
    summary: 'Удалить заказ',
    description:
      'Удаляет заказ и связанные с ним позиции. Доступно только администратору.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID заказа',
    example: 15,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Заказ успешно удалён.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав или email пользователя не подтверждён.',
  })
  @ApiResponse({
    status: 404,
    description: 'Заказ не найден.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }
}

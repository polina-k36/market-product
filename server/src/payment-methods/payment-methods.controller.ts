import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PaymentMethodsService } from './payment-methods.service.js';
import { CreateUpdatePaymentMethodDto } from './dto/create-update-payment-method.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { EmailVerifiedGuard } from '../auth/guards/email-verified.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { EmailVerified } from '../auth/decorators/email-verified.decorator.js';

@ApiTags('Payment Methods')
@UseGuards(JwtAuthGuard, RolesGuard, EmailVerifiedGuard)
@Roles('ADMIN')
@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Post()
  @EmailVerified(true)
  @ApiOperation({ summary: 'Создать способ оплаты' })
  @ApiResponse({
    status: 201,
    description: 'Способ оплаты успешно создан',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректные данные',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав или email не подтверждён',
  })
  @ApiResponse({
    status: 409,
    description: 'Способ оплаты с таким названием уже существует',
  })
  async create(@Body() createPaymentMethodDto: CreateUpdatePaymentMethodDto) {
    return {
      success: true,
      data: await this.paymentMethodsService.create(createPaymentMethodDto),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Получить список способов оплаты' })
  @ApiResponse({
    status: 200,
    description: 'Список способов оплаты',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав',
  })
  async findAll() {
    return {
      success: true,
      data: await this.paymentMethodsService.findAll(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить способ оплаты по ID' })
  @ApiParam({
    name: 'id',
    description: 'ID способа оплаты',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Способ оплаты найден',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав',
  })
  @ApiResponse({
    status: 404,
    description: 'Способ оплаты не найден',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.paymentMethodsService.findById(id),
    };
  }

  @Patch(':id')
  @EmailVerified(true)
  @ApiOperation({ summary: 'Обновить способ оплаты' })
  @ApiParam({
    name: 'id',
    description: 'ID способа оплаты',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Способ оплаты успешно обновлён',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректные данные',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав или email не подтверждён',
  })
  @ApiResponse({
    status: 404,
    description: 'Способ оплаты не найден',
  })
  @ApiResponse({
    status: 409,
    description: 'Способ оплаты с таким названием уже существует',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaymentMethodDto: CreateUpdatePaymentMethodDto,
  ) {
    return {
      success: true,
      data: await this.paymentMethodsService.update(id, updatePaymentMethodDto),
    };
  }

  @Delete(':id')
  @EmailVerified(true)
  @ApiOperation({ summary: 'Удалить способ оплаты' })
  @ApiParam({
    name: 'id',
    description: 'ID способа оплаты',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Способ оплаты успешно удалён',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав или email не подтверждён',
  })
  @ApiResponse({
    status: 404,
    description: 'Способ оплаты не найден',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.paymentMethodsService.remove(id),
    };
  }
}

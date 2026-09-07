import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { DeliveryMethodsService } from './delivery-methods.service.js';
import { CreateUpdateDeliveryMethodDto } from './dto/create-update-delivery-method.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { EmailVerifiedGuard } from '../auth/guards/email-verified.guard.js';

import { Roles } from '../auth/decorators/roles.decorator.js';
import { EmailVerified } from '../auth/decorators/email-verified.decorator.js';

@ApiTags('Delivery Methods')
@UseGuards(JwtAuthGuard, RolesGuard, EmailVerifiedGuard)
@Roles('ADMIN')
@Controller('delivery-methods')
export class DeliveryMethodsController {
  constructor(
    private readonly deliveryMethodsService: DeliveryMethodsService,
  ) {}

  @EmailVerified(true)
  @Post()
  @ApiOperation({
    summary: 'Создание способа доставки',
    description: 'Создаёт новый способ доставки.',
  })
  @ApiResponse({
    status: 201,
    description: 'Способ доставки успешно создан.',
  })
  @ApiResponse({
    status: 400,
    description: 'Переданы некорректные данные.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description:
      'Недостаточно прав или электронная почта пользователя не подтверждена.',
  })
  @ApiResponse({
    status: 409,
    description: 'Способ доставки с такими данными уже существует.',
  })
  async create(@Body() createDeliveryMethodDto: CreateUpdateDeliveryMethodDto) {
    return {
      success: true,
      data: await this.deliveryMethodsService.create(createDeliveryMethodDto),
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Получение списка способов доставки',
    description: 'Возвращает список всех доступных способов доставки.',
  })
  @ApiResponse({
    status: 200,
    description: 'Список способов доставки успешно получен.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав для выполнения операции.',
  })
  async findAll() {
    return {
      success: true,
      data: await this.deliveryMethodsService.findAll(),
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получение способа доставки по ID',
    description: 'Возвращает способ доставки с указанным идентификатором.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID способа доставки',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Способ доставки успешно получен.',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректный ID способа доставки.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав для выполнения операции.',
  })
  @ApiResponse({
    status: 404,
    description: 'Способ доставки не найден.',
  })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.deliveryMethodsService.findById(id),
    };
  }

  @EmailVerified(true)
  @Patch(':id')
  @ApiOperation({
    summary: 'Обновление способа доставки',
    description: 'Изменяет данные существующего способа доставки.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID способа доставки',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Способ доставки успешно обновлён.',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректный ID или данные способа доставки.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description:
      'Недостаточно прав или электронная почта пользователя не подтверждена.',
  })
  @ApiResponse({
    status: 404,
    description: 'Способ доставки не найден.',
  })
  @ApiResponse({
    status: 409,
    description: 'Способ доставки с такими данными уже существует.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDeliveryMethodDto: CreateUpdateDeliveryMethodDto,
  ) {
    return {
      success: true,
      data: await this.deliveryMethodsService.update(
        id,
        updateDeliveryMethodDto,
      ),
    };
  }

  @EmailVerified(true)
  @Delete(':id')
  @ApiOperation({
    summary: 'Удаление способа доставки',
    description: 'Удаляет способ доставки по указанному ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID способа доставки',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Способ доставки успешно удалён.',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректный ID способа доставки.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description:
      'Недостаточно прав или электронная почта пользователя не подтверждена.',
  })
  @ApiResponse({
    status: 404,
    description: 'Способ доставки не найден.',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.deliveryMethodsService.remove(id),
    };
  }
}

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

import { InvoiceTypeService } from './invoice-types.service.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { EmailVerifiedGuard } from '../auth/guards/email-verified.guard.js';

import { Roles } from '../auth/decorators/roles.decorator.js';
import { EmailVerified } from '../auth/decorators/email-verified.decorator.js';
import { CreateUpdateInvoiceTypeDto } from './dto/create-update-invoice-type.dto.js';

@ApiTags('Invoice Types')
@UseGuards(JwtAuthGuard, RolesGuard, EmailVerifiedGuard)
@Roles('ADMIN')
@Controller('invoice-type')
export class InvoiceTypeController {
  constructor(private readonly invoiceTypeService: InvoiceTypeService) {}

  @EmailVerified(true)
  @Post()
  @ApiOperation({
    summary: 'Создание типа накладной',
    description: 'Создаёт новый тип накладной.',
  })
  @ApiResponse({
    status: 201,
    description: 'Тип накладной успешно создан.',
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
    description: 'Тип накладной с таким названием уже существует.',
  })
  async create(@Body() createInvoiceTypeDto: CreateUpdateInvoiceTypeDto) {
    return {
      success: true,
      data: await this.invoiceTypeService.create(createInvoiceTypeDto),
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Получение списка типов накладных',
    description: 'Возвращает список всех активных типов накладных.',
  })
  @ApiResponse({
    status: 200,
    description: 'Список типов накладных успешно получен.',
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
      data: await this.invoiceTypeService.findAll(),
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получение типа накладной по ID',
    description: 'Возвращает тип накладной с указанным идентификатором.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID типа накладной',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Тип накладной успешно получен.',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректный ID типа накладной.',
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
    description: 'Тип накладной не найден.',
  })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.invoiceTypeService.findById(id),
    };
  }

  @EmailVerified(true)
  @Patch(':id')
  @ApiOperation({
    summary: 'Обновление типа накладной',
    description: 'Изменяет название существующего типа накладной.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID типа накладной',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Тип накладной успешно обновлён.',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректный ID или данные типа накладной.',
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
    description: 'Тип накладной не найден.',
  })
  @ApiResponse({
    status: 409,
    description: 'Тип накладной с таким названием уже существует.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInvoiceTypeDto: CreateUpdateInvoiceTypeDto,
  ) {
    return {
      success: true,
      data: await this.invoiceTypeService.update(id, updateInvoiceTypeDto),
    };
  }

  @EmailVerified(true)
  @Delete(':id')
  @ApiOperation({
    summary: 'Удаление типа накладной',
    description:
      'Помечает тип накладной как удалённый, если используется soft delete.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID типа накладной',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Тип накладной успешно удалён.',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректный ID типа накладной.',
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
    description: 'Тип накладной не найден.',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.invoiceTypeService.remove(id),
    };
  }
}

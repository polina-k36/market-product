import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { InvoicesService } from './invoices.service.js';
import { GetInvoicesQueryDto } from './dto/get-invoices-query.dto.js';
import { CreateIncomingInvoiceDto } from './dto/create-incoming-invoice.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { EmailVerifiedGuard } from '../auth/guards/email-verified.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { EmailVerified } from '../auth/decorators/email-verified.decorator.js';

@ApiTags('Invoices')
@UseGuards(JwtAuthGuard, RolesGuard, EmailVerifiedGuard)
@Roles('ADMIN')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  @ApiOperation({
    summary: 'Получить список накладных',
    description:
      'Возвращает список накладных с поддержкой пагинации и фильтрации. Доступно только администратору.',
  })
  @ApiResponse({
    status: 200,
    description: 'Список накладных успешно получен.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ разрешён только администратору.',
  })
  getAll(@Query() query: GetInvoicesQueryDto) {
    return this.invoicesService.getAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получить накладную по ID',
    description:
      'Возвращает подробную информацию о накладной по её идентификатору.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID накладной',
    example: 15,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Накладная успешно получена.',
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
    description: 'Накладная не найдена.',
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.invoicesService.getById(id),
    };
  }

  @Post()
  @EmailVerified(true)
  @ApiOperation({
    summary: 'Создать приходную накладную',
    description:
      'Создаёт приходную накладную и отражает поступление товаров на склад магазина.',
  })
  @ApiResponse({
    status: 201,
    description: 'Приходная накладная успешно создана.',
  })
  @ApiResponse({
    status: 400,
    description: 'Переданы некорректные данные накладной.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description:
      'Создание накладных доступно только администратору с подтверждённой электронной почтой.',
  })
  async createIncomingInvoice(@Body() body: CreateIncomingInvoiceDto) {
    return {
      success: true,
      data: await this.invoicesService.createIncomingInvoiceAndChangeStock(
        body,
      ),
    };
  }
}

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

import { SuppliersService } from './suppliers.service.js';
import { CreateUpdateSupplierDto } from '../suppliers/dto/create-update-supplier.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { EmailVerifiedGuard } from '../auth/guards/email-verified.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { EmailVerified } from '../auth/decorators/email-verified.decorator.js';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly supplierService: SuppliersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard, EmailVerifiedGuard)
  @Roles('ADMIN')
  @EmailVerified(true)
  @ApiOperation({ summary: 'Создать поставщика' })
  @ApiResponse({
    status: 201,
    description: 'Поставщик успешно создан',
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
    description: 'Поставщик с таким названием уже существует',
  })
  async create(@Body() createSupplierDto: CreateUpdateSupplierDto) {
    return {
      success: true,
      data: await this.supplierService.create(createSupplierDto),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Получить список поставщиков' })
  @ApiResponse({
    status: 200,
    description: 'Список поставщиков',
  })
  async findAll() {
    return {
      success: true,
      data: await this.supplierService.findAll(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить поставщика по ID' })
  @ApiParam({
    name: 'id',
    description: 'ID поставщика',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Поставщик найден',
  })
  @ApiResponse({
    status: 404,
    description: 'Поставщик не найден',
  })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.supplierService.findById(id),
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, EmailVerifiedGuard)
  @Roles('ADMIN')
  @EmailVerified(true)
  @ApiOperation({ summary: 'Обновить поставщика' })
  @ApiParam({
    name: 'id',
    description: 'ID поставщика',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Поставщик успешно обновлён',
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
    description: 'Поставщик не найден',
  })
  @ApiResponse({
    status: 409,
    description: 'Поставщик с таким названием уже существует',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSupplierDto: CreateUpdateSupplierDto,
  ) {
    return {
      success: true,
      data: await this.supplierService.update(id, updateSupplierDto),
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, EmailVerifiedGuard)
  @Roles('ADMIN')
  @EmailVerified(true)
  @ApiOperation({ summary: 'Удалить поставщика' })
  @ApiParam({
    name: 'id',
    description: 'ID поставщика',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Поставщик успешно удалён',
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
    description: 'Поставщик не найден',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.supplierService.remove(id),
    };
  }
}

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

import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { EmailVerifiedGuard } from '../auth/guards/email-verified.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { EmailVerified } from '../auth/decorators/email-verified.decorator.js';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard, EmailVerifiedGuard)
  @Roles('ADMIN')
  @EmailVerified(true)
  @ApiOperation({ summary: 'Создать товар' })
  @ApiResponse({
    status: 201,
    description: 'Товар успешно создан',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректные данные товара',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав или email пользователя не подтверждён',
  })
  @ApiResponse({
    status: 409,
    description: 'Товар с таким названием уже существует',
  })
  async create(@Body() createProductDto: CreateProductDto) {
    return {
      success: true,
      data: await this.productsService.create(createProductDto),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Получить список товаров' })
  @ApiResponse({
    status: 200,
    description: 'Список товаров успешно получен',
  })
  async findAll() {
    return {
      success: true,
      data: await this.productsService.findAll(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить товар по ID' })
  @ApiParam({
    name: 'id',
    description: 'ID товара',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Товар успешно получен',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректный ID товара',
  })
  @ApiResponse({
    status: 404,
    description: 'Товар не найден',
  })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.productsService.findById(id),
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, EmailVerifiedGuard)
  @Roles('ADMIN')
  @EmailVerified(true)
  @ApiOperation({ summary: 'Обновить товар' })
  @ApiParam({
    name: 'id',
    description: 'ID товара',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Товар успешно обновлён',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректные данные товара или ID',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав или email пользователя не подтверждён',
  })
  @ApiResponse({
    status: 404,
    description: 'Товар не найден',
  })
  @ApiResponse({
    status: 409,
    description: 'Товар с таким названием уже существует',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return {
      success: true,
      data: await this.productsService.update(id, updateProductDto),
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, EmailVerifiedGuard)
  @Roles('ADMIN')
  @EmailVerified(true)
  @ApiOperation({ summary: 'Удалить товар' })
  @ApiParam({
    name: 'id',
    description: 'ID товара',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Товар успешно удалён',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректный ID товара',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав или email пользователя не подтверждён',
  })
  @ApiResponse({
    status: 404,
    description: 'Товар не найден',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.productsService.remove(id),
    };
  }
}

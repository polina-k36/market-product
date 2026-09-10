import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductStockService } from './product-stock.service.js';
import { GetProductStockQueryDto } from './dto/get-product-stock-query.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@ApiTags('Product Stock')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('product-stock')
export class ProductStockController {
  constructor(private readonly productStockService: ProductStockService) {}

  @Get()
  @ApiOperation({
    summary: 'Получить остатки товаров',
    description:
      'Возвращает список остатков товаров по магазинам с поддержкой пагинации и фильтрации. Доступно только администратору.',
  })
  @ApiResponse({
    status: 200,
    description: 'Список остатков товаров успешно получен.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ разрешён только администратору.',
  })
  async getAll(@Query() query: GetProductStockQueryDto) {
    return {
      success: true,
      data: await this.productStockService.getAll(query),
    };
  }
}

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
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ShopsService } from './shops.service.js';
import { CreateShopDto } from './dto/create-shop.dto.js';
import { UpdateShopDto } from './dto/update-shop.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { EmailVerifiedGuard } from '../auth/guards/email-verified.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { EmailVerified } from '../auth/decorators/email-verified.decorator.js';
import { GetShopsQueryDto } from './dto/get-shops-query.dto.js';

@ApiTags('Shops')
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard, EmailVerifiedGuard)
  @Roles('ADMIN')
  @EmailVerified(true)
  @ApiOperation({ summary: 'Создать магазин' })
  @ApiResponse({
    status: 201,
    description: 'Магазин успешно создан',
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
  async create(@Body() createShopDto: CreateShopDto) {
    return {
      success: true,
      data: await this.shopsService.create(createShopDto),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Получить список магазинов' })
  @ApiResponse({
    status: 200,
    description: 'Список магазинов',
  })
  findAll(@Query() query: GetShopsQueryDto) {
    return this.shopsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить магазин по ID' })
  @ApiParam({
    name: 'id',
    description: 'ID магазина',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Магазин найден',
  })
  @ApiResponse({
    status: 404,
    description: 'Магазин не найден',
  })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.shopsService.findById(id),
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, EmailVerifiedGuard)
  @Roles('ADMIN')
  @EmailVerified(true)
  @ApiOperation({ summary: 'Обновить магазин' })
  @ApiParam({
    name: 'id',
    description: 'ID магазина',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Магазин успешно обновлён',
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
    description: 'Магазин не найден',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShopDto: UpdateShopDto,
  ) {
    return {
      success: true,
      data: await this.shopsService.update(id, updateShopDto),
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, EmailVerifiedGuard)
  @Roles('ADMIN')
  @EmailVerified(true)
  @ApiOperation({ summary: 'Удалить магазин' })
  @ApiParam({
    name: 'id',
    description: 'ID магазина',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Магазин успешно удалён',
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
    description: 'Магазин не найден',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.shopsService.remove(id),
    };
  }
}

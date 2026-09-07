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

import { CategoriesService } from './categories.service.js';
import { CreateUpdateCategoryDto } from './dto/create-update-category.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { EmailVerifiedGuard } from '../auth/guards/email-verified.guard.js';

import { Roles } from '../auth/decorators/roles.decorator.js';
import { EmailVerified } from '../auth/decorators/email-verified.decorator.js';

@ApiTags('Categories')
@UseGuards(JwtAuthGuard, RolesGuard, EmailVerifiedGuard)
@Roles('ADMIN')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @EmailVerified(true)
  @Post()
  @ApiOperation({
    summary: 'Создание категории',
    description: 'Создаёт новую категорию.',
  })
  @ApiResponse({
    status: 201,
    description: 'Категория успешно создана.',
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
    description: 'Категория с таким названием уже существует.',
  })
  async create(@Body() createCategoryDto: CreateUpdateCategoryDto) {
    return {
      success: true,
      data: await this.categoriesService.create(createCategoryDto),
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Получение списка категорий',
    description: 'Возвращает список всех категорий.',
  })
  @ApiResponse({
    status: 200,
    description: 'Список категорий успешно получен.',
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
      data: await this.categoriesService.findAll(),
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получение категории по ID',
    description: 'Возвращает категорию с указанным идентификатором.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID категории',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Категория успешно получена.',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректный ID категории.',
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
    description: 'Категория не найдена.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.categoriesService.findById(id),
    };
  }

  @EmailVerified(true)
  @Patch(':id')
  @ApiOperation({
    summary: 'Обновление категории',
    description: 'Изменяет название существующей категории.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID категории',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Категория успешно обновлена.',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректный ID категории или данные категории.',
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
    description: 'Категория не найдена.',
  })
  @ApiResponse({
    status: 409,
    description: 'Категория с таким названием уже существует.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: CreateUpdateCategoryDto,
  ) {
    return {
      success: true,
      data: await this.categoriesService.update(id, updateCategoryDto),
    };
  }

  @EmailVerified(true)
  @Delete(':id')
  @ApiOperation({
    summary: 'Удаление категории',
    description: 'Удаляет категорию с указанным идентификатором.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID категории',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Категория успешно удалена.',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректный ID категории.',
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
    description: 'Категория не найдена.',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.categoriesService.remove(id),
    };
  }
}

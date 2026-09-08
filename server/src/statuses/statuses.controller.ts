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

import { StatusesService } from './statuses.service.js';
import { CreateUpdateStatusDto } from './dto/create-update-status.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { EmailVerifiedGuard } from '../auth/guards/email-verified.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { EmailVerified } from '../auth/decorators/email-verified.decorator.js';

@ApiTags('Statuses')
@UseGuards(JwtAuthGuard)
@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Post()
  @UseGuards(RolesGuard, EmailVerifiedGuard)
  @Roles('ADMIN')
  @EmailVerified(true)
  @ApiOperation({ summary: 'Создать статус' })
  @ApiResponse({
    status: 201,
    description: 'Статус успешно создан',
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
    description: 'Статус с таким названием уже существует',
  })
  async create(@Body() createStatusDto: CreateUpdateStatusDto) {
    return {
      success: true,
      data: await this.statusesService.create(createStatusDto),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Получить список статусов' })
  @ApiResponse({
    status: 200,
    description: 'Список статусов',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  async findAll() {
    return {
      success: true,
      data: await this.statusesService.findAll(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить статус по ID' })
  @ApiParam({
    name: 'id',
    description: 'ID статуса',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Статус найден',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 404,
    description: 'Статус не найден',
  })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.statusesService.findById(id),
    };
  }

  @Patch(':id')
  @UseGuards(RolesGuard, EmailVerifiedGuard)
  @Roles('ADMIN')
  @EmailVerified(true)
  @ApiOperation({ summary: 'Обновить статус' })
  @ApiParam({
    name: 'id',
    description: 'ID статуса',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Статус успешно обновлён',
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
    description: 'Статус не найден',
  })
  @ApiResponse({
    status: 409,
    description: 'Статус с таким названием уже существует',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: CreateUpdateStatusDto,
  ) {
    return {
      success: true,
      data: await this.statusesService.update(id, updateStatusDto),
    };
  }

  @Delete(':id')
  @UseGuards(RolesGuard, EmailVerifiedGuard)
  @Roles('ADMIN')
  @EmailVerified(true)
  @ApiOperation({ summary: 'Удалить статус' })
  @ApiParam({
    name: 'id',
    description: 'ID статуса',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Статус успешно удалён',
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
    description: 'Статус не найден',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.statusesService.remove(id),
    };
  }
}

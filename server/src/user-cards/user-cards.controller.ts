import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';

import { UserCardsService } from './user-cards.service.js';
import { CreateUserCardDto } from './dto/create-user-card.dto.js';
import { UpdateUserCardDto } from './dto/update-user-card.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@ApiTags('User Cards')
@UseGuards(JwtAuthGuard)
@Controller('user-cards')
export class UserCardsController {
  constructor(private readonly userCardsService: UserCardsService) {}

  @Post()
  @ApiOperation({
    summary: 'Добавить банковскую карту',
    description:
      'Добавляет банковскую карту текущему авторизованному пользователю.',
  })
  @ApiResponse({
    status: 201,
    description: 'Банковская карта успешно добавлена',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректные данные банковской карты',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 409,
    description: 'Банковская карта с такими данными уже существует',
  })
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() createUserCardDto: CreateUserCardDto,
  ) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.userCardsService.create(userId, createUserCardDto),
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Получить банковские карты пользователя',
    description:
      'Возвращает все активные банковские карты текущего пользователя.',
  })
  @ApiResponse({
    status: 200,
    description: 'Список банковских карт успешно получен',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  async findAll(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.userCardsService.findAllByUserId(userId),
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получить банковскую карту по ID',
    description:
      'Возвращает банковскую карту текущего пользователя по её идентификатору.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID банковской карты',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Банковская карта успешно получена',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректный ID банковской карты',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 404,
    description:
      'Банковская карта не найдена или не принадлежит текущему пользователю',
  })
  async findById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.userCardsService.findById(id, userId),
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Обновить банковскую карту',
    description: 'Обновляет данные банковской карты текущего пользователя.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID банковской карты',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Банковская карта успешно обновлена',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректные данные банковской карты или ID',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 404,
    description:
      'Банковская карта не найдена или не принадлежит текущему пользователю',
  })
  @ApiResponse({
    status: 409,
    description: 'Банковская карта с такими данными уже существует',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
    @Body() updateUserCardDto: UpdateUserCardDto,
  ) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.userCardsService.update(id, userId, updateUserCardDto),
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Удалить банковскую карту',
    description:
      'Выполняет мягкое удаление банковской карты текущего пользователя.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID банковской карты',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Банковская карта успешно удалена',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректный ID банковской карты',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 404,
    description:
      'Банковская карта не найдена или не принадлежит текущему пользователю',
  })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.userCardsService.remove(id, userId),
    };
  }
}

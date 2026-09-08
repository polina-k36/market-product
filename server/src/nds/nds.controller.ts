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

import { NdsService } from './nds.service.js';
import { CreateNdsDto } from './dto/create-nds.dto.js';
import { UpdateNdsDto } from './dto/update-nds.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { EmailVerifiedGuard } from '../auth/guards/email-verified.guard.js';

import { Roles } from '../auth/decorators/roles.decorator.js';
import { EmailVerified } from '../auth/decorators/email-verified.decorator.js';

@ApiTags('NDS')
@UseGuards(JwtAuthGuard, RolesGuard, EmailVerifiedGuard)
@Roles('ADMIN')
@Controller('nds')
export class NdsController {
  constructor(private readonly ndsService: NdsService) {}

  @EmailVerified(true)
  @Post()
  @ApiOperation({
    summary: 'Создание ставки НДС',
    description: 'Создаёт новую ставку НДС.',
  })
  @ApiResponse({
    status: 201,
    description: 'Ставка НДС успешно создана.',
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
    description: 'Ставка НДС с такими данными уже существует.',
  })
  async create(@Body() createNdsDto: CreateNdsDto) {
    return {
      success: true,
      data: await this.ndsService.create(createNdsDto),
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Получение списка ставок НДС',
    description: 'Возвращает список всех активных ставок НДС.',
  })
  @ApiResponse({
    status: 200,
    description: 'Список ставок НДС успешно получен.',
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
      data: await this.ndsService.findAll(),
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получение ставки НДС по ID',
    description: 'Возвращает ставку НДС с указанным идентификатором.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID ставки НДС',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Ставка НДС успешно получена.',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректный ID ставки НДС.',
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
    description: 'Ставка НДС не найдена.',
  })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.ndsService.findById(id),
    };
  }

  @EmailVerified(true)
  @Patch(':id')
  @ApiOperation({
    summary: 'Обновление ставки НДС',
    description: 'Изменяет существующую ставку НДС.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID ставки НДС',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Ставка НДС успешно обновлена.',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректный ID или данные ставки НДС.',
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
    description: 'Ставка НДС не найдена.',
  })
  @ApiResponse({
    status: 409,
    description: 'Ставка НДС с такими данными уже существует.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNdsDto: UpdateNdsDto,
  ) {
    return {
      success: true,
      data: await this.ndsService.update(id, updateNdsDto),
    };
  }

  @EmailVerified(true)
  @Delete(':id')
  @ApiOperation({
    summary: 'Удаление ставки НДС',
    description:
      'Помечает ставку НДС как удалённую, если используется soft delete.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID ставки НДС',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Ставка НДС успешно удалена.',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректный ID ставки НДС.',
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
    description: 'Ставка НДС не найдена.',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.ndsService.remove(id),
    };
  }
}

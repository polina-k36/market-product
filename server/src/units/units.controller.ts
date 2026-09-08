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

import { UnitsService } from './units.service.js';
import { CreateUnitDto } from './dto/create-unit.dto.js';
import { UpdateUnitDto } from './dto/update-unit.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { EmailVerifiedGuard } from '../auth/guards/email-verified.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { EmailVerified } from '../auth/decorators/email-verified.decorator.js';

@ApiTags('Units')
@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard, EmailVerifiedGuard)
  @Roles('ADMIN')
  @EmailVerified(true)
  @ApiOperation({ summary: 'Создать единицу измерения' })
  @ApiResponse({
    status: 201,
    description: 'Единица измерения успешно создана',
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
    description: 'Единица измерения с таким названием уже существует',
  })
  async create(@Body() createUnitDto: CreateUnitDto) {
    return {
      success: true,
      data: await this.unitsService.create(createUnitDto),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Получить список единиц измерения' })
  @ApiResponse({
    status: 200,
    description: 'Список единиц измерения',
  })
  async findAll() {
    return {
      success: true,
      data: await this.unitsService.findAll(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить единицу измерения по ID' })
  @ApiParam({
    name: 'id',
    description: 'ID единицы измерения',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Единица измерения найдена',
  })
  @ApiResponse({
    status: 404,
    description: 'Единица измерения не найдена',
  })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.unitsService.findById(id),
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, EmailVerifiedGuard)
  @Roles('ADMIN')
  @EmailVerified(true)
  @ApiOperation({ summary: 'Обновить единицу измерения' })
  @ApiParam({
    name: 'id',
    description: 'ID единицы измерения',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Единица измерения успешно обновлена',
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
    description: 'Единица измерения не найдена',
  })
  @ApiResponse({
    status: 409,
    description: 'Единица измерения с таким названием уже существует',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUnitDto: UpdateUnitDto,
  ) {
    return {
      success: true,
      data: await this.unitsService.update(id, updateUnitDto),
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, EmailVerifiedGuard)
  @Roles('ADMIN')
  @EmailVerified(true)
  @ApiOperation({ summary: 'Удалить единицу измерения' })
  @ApiParam({
    name: 'id',
    description: 'ID единицы измерения',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Единица измерения успешно удалена',
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
    description: 'Единица измерения не найдена',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.unitsService.remove(id),
    };
  }
}

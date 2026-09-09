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

import { UserAddressesService } from './user-addresses.service.js';
import { CreateUserAddressDto } from './dto/create-user-address.dto.js';
import { UpdateUserAddressDto } from './dto/update-user-address.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';

@ApiTags('User Addresses')
@UseGuards(JwtAuthGuard)
@Controller('user-addresses')
export class UserAddressesController {
  constructor(private readonly userAddressesService: UserAddressesService) {}

  @Post()
  @ApiOperation({ summary: 'Добавить адрес пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Адрес успешно добавлен',
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
    status: 409,
    description: 'Такой адрес уже существует',
  })
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() createUserAddressDto: CreateUserAddressDto,
  ) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.userAddressesService.create(
        userId,
        createUserAddressDto,
      ),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Получить адреса пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Список адресов пользователя',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  async findAll(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.userAddressesService.findAllByUserId(userId),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить адрес пользователя по ID' })
  @ApiParam({
    name: 'id',
    description: 'ID адреса',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Адрес найден',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 404,
    description: 'Адрес не найден',
  })
  async findById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.userAddressesService.findById(id, userId),
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить адрес пользователя' })
  @ApiParam({
    name: 'id',
    description: 'ID адреса',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Адрес успешно обновлён',
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
    status: 404,
    description: 'Адрес не найден',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
    @Body() updateUserAddressDto: UpdateUserAddressDto,
  ) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.userAddressesService.update(
        id,
        userId,
        updateUserAddressDto,
      ),
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить адрес пользователя' })
  @ApiParam({
    name: 'id',
    description: 'ID адреса',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Адрес успешно удалён',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 404,
    description: 'Адрес не найден',
  })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    return {
      success: true,
      data: await this.userAddressesService.remove(id, userId),
    };
  }
}

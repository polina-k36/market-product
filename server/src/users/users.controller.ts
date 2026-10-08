import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { EmailVerifiedGuard } from '../auth/guards/email-verified.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { EmailVerified } from '../auth/decorators/email-verified.decorator.js';
import { GetUsersQueryDto } from './dto/get-users-query.dto.js';
import { UpdatePasswordDto } from './dto/update-password.dto.js';

@ApiTags('Users')
@UseGuards(JwtAuthGuard, RolesGuard, EmailVerifiedGuard)
@Roles('ADMIN')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Создание пользователя',
    description:
      'Создаёт нового пользователя. Доступно только администратору с подтверждённой электронной почтой.',
  })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно создан.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав или электронная почта не подтверждена.',
  })
  @ApiResponse({
    status: 409,
    description:
      'Пользователь с указанным email или номером телефона уже существует.',
  })
  @EmailVerified(true)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return {
      success: true,
      data: await this.usersService.create(createUserDto),
    };
  }

  @ApiOperation({
    summary: 'Получение списка пользователей',
    description:
      'Возвращает список всех пользователей, доступных для просмотра администратору.',
  })
  @ApiResponse({
    status: 200,
    description: 'Список пользователей успешно получен.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав для просмотра списка пользователей.',
  })
  @Get()
  findAll(@Query() query: GetUsersQueryDto) {
    return this.usersService.getAll(query);
  }

  @ApiOperation({
    summary: 'Получение пользователя по ID',
    description: 'Возвращает информацию о конкретном пользователе.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID пользователя',
    example: 12,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно найден.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав для просмотра пользователя.',
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден.',
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.usersService.getUserById(id),
    };
  }

  @ApiOperation({
    summary: 'Обновление собственного профиля',
    description: 'Изменяет данные текущего авторизованного пользователя.',
  })
  @ApiResponse({
    status: 200,
    description: 'Профиль пользователя успешно обновлён.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ запрещён.',
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден.',
  })
  @ApiResponse({
    status: 409,
    description: 'Указанный email или номер телефона уже используется.',
  })
  @Roles('ADMIN', 'CLIENT')
  @Patch('me')
  updateProfile(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const id = req.user.sub;

    return this.usersService.update(id, updateUserDto);
  }

  @Patch('password')
  @ApiOperation({
    summary: 'Изменение пароля',
    description: 'Изменить пароль у текущего авторизованного пользователя.',
  })
  @ApiResponse({
    status: 200,
    description: 'Пароль успешно изменён.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Новый пароль и подтверждение пароля не совпадают или текущий пароль указан неверно.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  async updatePassword(
    @Req() req: AuthenticatedRequest,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const userId = req.user.sub;
    return {
      success: true,
      data: await this.usersService.updatePassword(userId, updatePasswordDto),
    };
  }

  @ApiOperation({
    summary: 'Обновление пользователя',
    description:
      'Изменяет данные указанного пользователя. Доступно только администратору с подтверждённой электронной почтой.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID пользователя',
    example: 12,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Данные пользователя успешно обновлены.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description:
      'Недостаточно прав или электронная почта администратора не подтверждена.',
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден.',
  })
  @ApiResponse({
    status: 409,
    description: 'Указанный email или номер телефона уже используется.',
  })
  @EmailVerified(true)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Удаление пользователя',
    description:
      'Выполняет мягкое удаление пользователя. Аккаунт помечается как удалённый, при этом история заказов сохраняется.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID пользователя',
    example: 12,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно удалён.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 403,
    description:
      'Недостаточно прав или электронная почта администратора не подтверждена.',
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден.',
  })
  @EmailVerified(true)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import type { Response, Request } from 'express';
import { REFRESH_TOKEN_EXPIRES_IN_DAYS } from './constants/auth.constants.js';
import { GoogleAuthDto } from './dto/google-auth.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';
import { RegisterUserDto } from '../users/dto/register-user.dto.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Вход пользователя',
    description:
      'Авторизация пользователя по email или номеру телефона и паролю.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Пользователь успешно авторизован. Access token возвращается в ответе, refresh token устанавливается в HttpOnly cookie.',
  })
  @ApiResponse({
    status: 401,
    description: 'Неверный логин или пароль.',
  })
  @Post('login')
  async login(
    @Body() dtoLoginUser: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...loginData } =
      await this.authService.login(dtoLoginUser);

    res.cookie('refreshToken', refreshToken, {
      maxAge: REFRESH_TOKEN_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    });

    return loginData;
  }

  @ApiOperation({
    summary: 'Регистрация пользователя',
    description:
      'Создание нового пользователя с использованием email или номера телефона.',
  })
  @ApiResponse({
    status: 201,
    description:
      'Пользователь успешно зарегистрирован. Access token возвращается в ответе, refresh token устанавливается в HttpOnly cookie.',
  })
  @ApiResponse({
    status: 409,
    description:
      'Пользователь с указанным email или номером телефона уже существует.',
  })
  @Post('register')
  async register(
    @Body() dtoRegUser: RegisterUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...registerData } =
      await this.authService.register(dtoRegUser);

    res.cookie('refreshToken', refreshToken, {
      maxAge: REFRESH_TOKEN_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    });

    return registerData;
  }

  @ApiOperation({
    summary: 'Обновление access token',
    description:
      'Получение нового access token с использованием refresh token из HttpOnly cookie.',
  })
  @ApiCookieAuth('refreshToken')
  @ApiResponse({
    status: 200,
    description: 'Access token успешно обновлён.',
  })
  @ApiResponse({
    status: 401,
    description: 'Refresh token отсутствует, недействителен или истёк.',
  })
  @Post('refresh')
  async refresh(@Req() req: Request) {
    return await this.authService.refresh(req.cookies.refreshToken);
  }

  @ApiOperation({
    summary: 'Выход пользователя',
    description:
      'Завершение текущей сессии и удаление refresh token из cookie.',
  })
  @ApiCookieAuth('refreshToken')
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно вышел из системы.',
  })
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    await this.authService.logout(req.cookies.refreshToken);

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
    });

    return {
      success: true,
      message: 'Successfully logged out.',
    };
  }

  @ApiOperation({
    summary: 'Получение профиля пользователя',
    description: 'Получение профиля текущего авторизованного пользователя.',
  })
  @ApiResponse({
    status: 200,
    description: 'Профиль пользователя успешно получен.',
  })
  @ApiResponse({
    status: 401,
    description: 'Необходима авторизация.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    return await this.authService.profile(userId);
  }

  @ApiOperation({
    summary: 'Авторизация через Google',
    description:
      'Авторизация или регистрация пользователя через Google ID token.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Пользователь успешно авторизован через Google. Access token возвращается в ответе, refresh token устанавливается в HttpOnly cookie.',
  })
  @ApiResponse({
    status: 401,
    description:
      'Google ID token недействителен или данные Google аккаунта некорректны.',
  })
  @ApiResponse({
    status: 409,
    description:
      'Невозможно автоматически связать Google аккаунт с существующим неподтверждённым аккаунтом.',
  })
  @Post('google')
  async google(
    @Body() dtoGoogle: GoogleAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...resultData } = await this.authService.google(
      dtoGoogle.credential,
    );

    res.cookie('refreshToken', refreshToken, {
      maxAge: REFRESH_TOKEN_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    });

    return resultData;
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import type { Response, Request } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { Reflector } from '@nestjs/core';
import { REFRESH_TOKEN_EXPIRES_IN_DAYS } from './constants/auth.constants.js';
import { GoogleAuthDto } from './dto/google-auth.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
      secure: false, //установка тру когда передача будет по защищенному каналу по https
    });

    return loginData;
  }

  @Post('register')
  async register(
    @Body() dtoRegUser: CreateUserDto,
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

  @Post('refresh')
  async refresh(@Req() req: Request) {
    return await this.authService.refresh(req.cookies.refreshToken);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    await this.authService.logout(req.cookies.refreshToken);
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false, //смени когда придет время
    });
    return {
      success: true,
      message: 'Successfully logged out.',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Req() req: Request) {
    const userId = req.user?.sub ?? 0;
    return await this.authService.profile(userId);
  }

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

import {
  Controller,
  ParseEnumPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { VerificationsService } from './verifications.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { VerificationMethod } from './enums/verification-method.enum.js';
import { EmailVerifiedGuard } from '../auth/guards/email-verified.guard.js';
import { EmailVerified } from '../auth/decorators/email-verified.decorator.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';

@ApiTags('Verifications')
@UseGuards(JwtAuthGuard, EmailVerifiedGuard)
@Controller('verifications')
export class VerificationsController {
  constructor(private readonly verificationsService: VerificationsService) {}

  @ApiOperation({
    summary: 'Отправка email для верификации',
    description:
      'Отправляет пользователю письмо с кодом или ссылкой для подтверждения электронной почты.',
  })
  @ApiQuery({
    name: 'method',
    description: 'Способ подтверждения электронной почты',
    enum: VerificationMethod,
    example: VerificationMethod.CODE,
  })
  @ApiResponse({
    status: 201,
    description:
      'Письмо для подтверждения электронной почты успешно отправлено.',
  })
  @ApiResponse({
    status: 400,
    description: 'Указан недопустимый метод верификации.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 404,
    description: 'Email пользователя не найден.',
  })
  @Post('email/send')
  sendEmailVerification(
    @Query('method', new ParseEnumPipe(VerificationMethod))
    method: VerificationMethod,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    return this.verificationsService.sendEmail(userId, method);
  }

  @ApiOperation({
    summary: 'Подтверждение электронной почты',
    description:
      'Проверяет код или токен подтверждения и отмечает электронную почту пользователя как подтверждённую.',
  })
  @ApiQuery({
    name: 'value',
    description: 'Код или токен подтверждения электронной почты',
    example: '583921',
  })
  @ApiResponse({
    status: 201,
    description: 'Электронная почта успешно подтверждена.',
  })
  @ApiResponse({
    status: 401,
    description:
      'Пользователь не авторизован, код недействителен или срок его действия истёк.',
  })
  @ApiResponse({
    status: 403,
    description: 'Электронная почта пользователя уже подтверждена.',
  })
  @EmailVerified(false)
  @Post('email/confirm')
  confirmEmailVerification(
    @Query('value') value: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;

    return this.verificationsService.confirmEmail(userId, value);
  }
}

import { Controller, Post, Query, Req, UseGuards } from '@nestjs/common';
import { VerificationsService } from './verifications.service.js';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { VerificationMethod } from './enums/verification-method.enum.js';

@UseGuards(JwtAuthGuard)
@Controller('verifications')
export class VerificationsController {
  constructor(private readonly verificationsService: VerificationsService) {}

  @Post('email/send')
  sendEmailVerification(
    @Query('method') method: VerificationMethod,
    @Req() req: Request,
  ) {
    const userId = req.user ? req.user.sub : 0;
    return this.verificationsService.sendEmail(userId, method);
  }

  @Post('email/confirm')
  confirmEmailVerification(@Query('value') value: string, @Req() req: Request) {
    const userId = req.user ? req.user.sub : 0;
    return this.verificationsService.confirmEmail(userId, value);
  }
}

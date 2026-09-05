import { Controller, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { VerificationsService } from './verifications.service.js';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { ConfirmVerificationDto } from './dto/confirm-verification.dto.js';

@UseGuards(JwtAuthGuard)
@Controller('verifications')
export class VerificationsController {
  constructor(private readonly verificationsService: VerificationsService) {}

  @Post('email/send')
  sendEmailVerification(@Req() req: Request) {
    const userId = req.user ? req.user.sub : 0;
    return this.verificationsService.sendEmail(userId);
  }

  @Post('email/confirm')
  confirmEmailVerification(
    @Query() query: ConfirmVerificationDto,
    @Req() req: Request,
  ) {
    const userId = req.user ? req.user.sub : 0;
    return this.verificationsService.confirmEmail(
      userId,
      query.id,
      query.token,
    );
  }
}

import { Controller, Post, Req } from '@nestjs/common';
import { VerificationsService } from './verifications.service.js';
import type { Request } from 'express';

@Controller('verifications')
export class VerificationsController {
  constructor(private readonly verificationsService: VerificationsService) {}

  @Post('email/send')
  sendEmailVerification(@Req() req: Request) {
    const userId = req.user ? req.user.sub : 0;
    this.verificationsService.sendEmail(userId);
  }

  @Post('email/confirm')
  confirmEmailVerification() {}
}

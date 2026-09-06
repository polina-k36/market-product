import {
  Controller,
  ParseEnumPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { VerificationsService } from './verifications.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { VerificationMethod } from './enums/verification-method.enum.js';
import { EmailVerifiedGuard } from '../auth/guards/email-verified.guard.js';
import { EmailVerified } from '../auth/decorators/email-verified.decorator.js';
import type { AuthenticatedRequest } from '../types/authenticated-request.js';

@UseGuards(JwtAuthGuard, EmailVerifiedGuard)
@Controller('verifications')
export class VerificationsController {
  constructor(private readonly verificationsService: VerificationsService) {}

  @Post('email/send')
  sendEmailVerification(
    @Query('method', new ParseEnumPipe(VerificationMethod))
    method: VerificationMethod,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;
    return this.verificationsService.sendEmail(userId, method);
  }

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

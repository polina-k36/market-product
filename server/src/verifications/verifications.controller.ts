import { Controller, Post } from '@nestjs/common';
import { VerificationsService } from './verifications.service.js';

@Controller('verifications')
export class VerificationsController {
  constructor(private readonly verificationsService: VerificationsService) {}

  @Post('email/send')
  sendEmailVerification() {

  }

  @Post('email/confirm')
  confirmEmailVerification() {
    
  }
}

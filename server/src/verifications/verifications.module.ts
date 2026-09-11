import { Module } from '@nestjs/common';
import { VerificationsService } from './verifications.service.js';
import { VerificationsController } from './verifications.controller.js';
import { UsersModule } from '../users/users.module.js';
import { MailModule } from '../mail/mail.module.js';
import { JwtTokensModule } from '../jwt-tokens/jwt-tokens.module.js';

@Module({
  imports: [UsersModule, MailModule, JwtTokensModule],
  controllers: [VerificationsController],
  providers: [VerificationsService],
  exports: [VerificationsService],
})
export class VerificationsModule {}

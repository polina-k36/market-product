import { Module } from '@nestjs/common';
import { VerificationsService } from './verifications.service.js';
import { VerificationsController } from './verifications.controller.js';
import { UsersModule } from '../users/users.module.js';
import { MailModule } from '../mail/mail.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [UsersModule, MailModule, AuthModule],
  controllers: [VerificationsController],
  providers: [VerificationsService],
})
export class VerificationsModule {}

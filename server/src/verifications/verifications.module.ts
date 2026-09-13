import { Module } from '@nestjs/common';
import { VerificationsService } from './verifications.service.js';
import { VerificationsController } from './verifications.controller.js';
import { UsersModule } from '../users/users.module.js';
import { MailModule } from '../mail/mail.module.js';

@Module({
  imports: [UsersModule, MailModule],
  controllers: [VerificationsController],
  providers: [VerificationsService],
  exports: [VerificationsService],
})
export class VerificationsModule {}

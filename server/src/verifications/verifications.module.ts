import { Module } from '@nestjs/common';
import { VerificationsService } from './verifications.service.js';
import { VerificationsController } from './verifications.controller.js';
import { UsersService } from '../users/users.service.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports: [UsersModule],
  controllers: [VerificationsController],
  providers: [VerificationsService],
})
export class VerificationsModule {}

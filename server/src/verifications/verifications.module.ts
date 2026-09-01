import { Module } from '@nestjs/common';
import { VerificationsService } from './verifications.service.js';
import { VerificationsController } from './verifications.controller.js';

@Module({
  controllers: [VerificationsController],
  providers: [VerificationsService],
})
export class VerificationsModule {}

import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service.js';
import { StatusesController } from './statuses.controller.js';

@Module({
  controllers: [StatusesController],
  providers: [StatusesService],
})
export class StatusesModule {}

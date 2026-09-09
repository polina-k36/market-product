import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service.js';
import { StatusesController } from './statuses.controller.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [StatusesController],
  providers: [StatusesService],
})
export class StatusesModule {}

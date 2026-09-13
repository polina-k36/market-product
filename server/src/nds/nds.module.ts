import { Module } from '@nestjs/common';
import { NdsService } from './nds.service.js';
import { NdsController } from './nds.controller.js';

@Module({
  controllers: [NdsController],
  providers: [NdsService],
})
export class NdsModule {}

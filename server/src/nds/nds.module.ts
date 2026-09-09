import { Module } from '@nestjs/common';
import { NdsService } from './nds.service.js';
import { NdsController } from './nds.controller.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [NdsController],
  providers: [NdsService],
})
export class NdsModule {}

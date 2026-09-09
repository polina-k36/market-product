import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service.js';
import { ShopsController } from './shops.controller.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [ShopsController],
  providers: [ShopsService],
})
export class ShopsModule {}

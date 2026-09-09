import { Module } from '@nestjs/common';
import { UnitsService } from './units.service.js';
import { UnitsController } from './units.controller.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [UnitsController],
  providers: [UnitsService],
})
export class UnitsModule {}

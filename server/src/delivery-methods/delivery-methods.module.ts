import { Module } from '@nestjs/common';
import { DeliveryMethodsService } from './delivery-methods.service.js';
import { DeliveryMethodsController } from './delivery-methods.controller.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [DeliveryMethodsController],
  providers: [DeliveryMethodsService],
})
export class DeliveryMethodsModule {}

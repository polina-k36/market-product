import { Module } from '@nestjs/common';
import { DeliveryMethodsService } from './delivery-methods.service.js';
import { DeliveryMethodsController } from './delivery-methods.controller.js';

@Module({
  controllers: [DeliveryMethodsController],
  providers: [DeliveryMethodsService],
})
export class DeliveryMethodsModule {}

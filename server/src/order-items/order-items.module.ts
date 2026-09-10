import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service.js';
import { OrderItemsController } from './order-items.controller.js';

@Module({
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}

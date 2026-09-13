import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  providers: [OrderItemsService],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}

import { Module } from '@nestjs/common';
import { StockReservationItemsService } from './stock-reservation-items.service.js';

@Module({
  providers: [StockReservationItemsService],
  exports: [StockReservationItemsService],
})
export class StockReservationItemsModule {}

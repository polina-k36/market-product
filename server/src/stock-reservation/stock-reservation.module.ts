import { Module } from '@nestjs/common';
import { StockReservationService } from './stock-reservation.service.js';
import { StockReservationController } from './stock-reservation.controller.js';
import { ProductStockModule } from '../product-stock/product-stock.module.js';
import { StockReservationItemsModule } from '../stock-reservation-items/stock-reservation-items.module.js';
import { CartsModule } from '../carts/carts.module.js';

@Module({
  imports: [ProductStockModule, StockReservationItemsModule, CartsModule],
  controllers: [StockReservationController],
  providers: [StockReservationService],
})
export class StockReservationModule {}

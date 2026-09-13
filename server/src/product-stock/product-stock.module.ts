import { Module } from '@nestjs/common';
import { ProductStockService } from './product-stock.service.js';
import { ProductStockController } from './product-stock.controller.js';

@Module({
  controllers: [ProductStockController],
  providers: [ProductStockService],
  exports: [ProductStockService],
})
export class ProductStockModule {}

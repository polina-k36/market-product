import { Module } from '@nestjs/common';
import { ProductStockService } from './product-stock.service.js';
import { ProductStockController } from './product-stock.controller.js';

@Module({
  providers: [ProductStockService],
  exports: [ProductStockService],
  controllers: [ProductStockController],
})
export class ProductStockModule {}

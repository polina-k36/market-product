import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service.js';
import { ShopsController } from './shops.controller.js';
import { ProductStockModule } from '../product-stock/product-stock.module.js';

@Module({
  imports: [ProductStockModule],
  controllers: [ShopsController],
  providers: [ShopsService],
})
export class ShopsModule {}

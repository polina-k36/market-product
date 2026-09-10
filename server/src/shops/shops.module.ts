import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service.js';
import { ShopsController } from './shops.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { ProductStockModule } from '../product-stock/product-stock.module.js';

@Module({
  imports: [JwtModule, ProductStockModule],
  controllers: [ShopsController],
  providers: [ShopsService],
})
export class ShopsModule {}

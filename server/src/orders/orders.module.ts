import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { OrdersController } from './orders.controller.js';
import { ProductsModule } from '../products/products.module.js';
import { OrderItemsModule } from '../order-items/order-items.module.js';
import { JwtModule } from '@nestjs/jwt';
import { ProductStockModule } from '../product-stock/product-stock.module.js';

@Module({
  imports: [JwtModule, ProductsModule, OrderItemsModule, ProductStockModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

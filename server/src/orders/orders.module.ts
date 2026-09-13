import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { OrdersController } from './orders.controller.js';
import { ProductsModule } from '../products/products.module.js';
import { OrderItemsModule } from '../order-items/order-items.module.js';
import { ProductStockModule } from '../product-stock/product-stock.module.js';
import { InvoicesModule } from '../invoices/invoices.module.js';

@Module({
  imports: [
    ProductsModule,
    OrderItemsModule,
    ProductStockModule,
    InvoicesModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

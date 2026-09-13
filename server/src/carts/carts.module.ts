import { Module } from '@nestjs/common';
import { CartsService } from './carts.service.js';
import { CartsController } from './carts.controller.js';
import { ProductsModule } from '../products/products.module.js';

@Module({
  imports: [ProductsModule],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}

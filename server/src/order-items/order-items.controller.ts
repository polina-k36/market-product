import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OrderItemsService } from './order-items.service.js';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Get()
  async getAll(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.orderItemsService.getAll(),
    };
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.orderItemsService.getById(id),
    };
  }
}

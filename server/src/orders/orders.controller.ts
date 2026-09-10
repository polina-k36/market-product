import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    // return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    const role = req.user.role;
    return this.ordersService.findAll(userId, role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.ordersService.findOne(+id);
  }

  @Patch(':id/status')
  changeStatus(@Param('id') id: string, @Body('status') status: string) {
    // return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}

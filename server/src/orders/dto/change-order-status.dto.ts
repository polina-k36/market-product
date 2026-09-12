import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { OrderStatusEnum } from '../../common/enums/order-status.enum.js';

export class ChangeOrderStatusDto {
  @ApiProperty({
    description: 'Новый статус заказа',
    enum: OrderStatusEnum,
    example: OrderStatusEnum.SHIPPED,
  })
  @IsEnum(OrderStatusEnum)
  statusId: OrderStatusEnum;
}

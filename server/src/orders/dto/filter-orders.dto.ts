import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsOptional, Min } from 'class-validator';

import { OrderStatusEnum } from '../../common/enums/order-status.enum.js';

export class FilterOrdersDto {
  @ApiPropertyOptional({
    description: 'Дата и время, начиная с которых выполняется фильтрация',
    example: '2026-09-01T00:00:00.000Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateFrom?: Date;

  @ApiPropertyOptional({
    description: 'Дата и время, до которых выполняется фильтрация',
    example: '2026-09-30T23:59:59.999Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateTo?: Date;

  @ApiPropertyOptional({
    description: 'ID магазина, из которого был выполнен заказ',
    example: 2,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  shopId?: number;

  @ApiPropertyOptional({
    description: 'Статус заказа',
    enum: OrderStatusEnum,
    example: OrderStatusEnum.CONFIRMED,
  })
  @IsOptional()
  @IsEnum(OrderStatusEnum)
  statusId?: OrderStatusEnum;

  @ApiPropertyOptional({
    description: 'ID способа оплаты',
    example: 3,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  paymentMethodId?: number;

  @ApiPropertyOptional({
    description: 'ID пользователя, создавшего заказ',
    example: 15,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  userId?: number;

  @ApiPropertyOptional({
    description: 'ID способа доставки',
    example: 2,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  deliveryMethodId?: number;
}

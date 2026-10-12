import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { CreateStockReservationItemDto } from '../../stock-reservation-items/dto/create-stock-reservation-item.dto.js';

export class CreateStockReservationDto {
  @ApiProperty({
    description: 'Идентификатор магазина, в котором резервируются товары',
    example: 3,
    type: Number,
    minimum: 1,
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  shopId: number;

  @ApiProperty({
    description: 'Список товаров и их количества для резервирования',
    type: [CreateStockReservationItemDto],
    example: [
      { productId: 15, quantity: 2 },
      { productId: 10, quantity: 1 },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateStockReservationItemDto)
  items: CreateStockReservationItemDto[];
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class CreateStockReservationItemDto {
  @ApiProperty({
    description: 'Идентификатор товара',
    example: 15,
    type: Number,
    minimum: 1,
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  productId: number;

  @ApiProperty({
    description: 'Количество товара, которое необходимо зарезервировать',
    example: 2,
    type: Number,
    minimum: 1,
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 3 })
  @IsPositive()
  quantity: number;
}

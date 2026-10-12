import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class UpdateReservationShopDto {
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
}

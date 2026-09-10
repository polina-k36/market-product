import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({
    description: 'ID товара',
    example: 5,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  productId: number;

  @ApiProperty({
    description: 'Количество товара',
    example: 2.5,
    minimum: 0.001,
  })
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0.001)
  quantity: number;
}

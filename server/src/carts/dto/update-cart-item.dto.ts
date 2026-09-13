import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateCartItemDto {
  @ApiProperty({
    description: 'Количество товара изменния в корзине',
    example: 1,
    minimum: 0.001,
    default: 1,
  })
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0.001)
  quantity: number;
}

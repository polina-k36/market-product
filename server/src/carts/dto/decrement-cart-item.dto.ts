import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class DecrementCartItemDto {
  @ApiPropertyOptional({
    description: 'Количество товара для уменьшения в корзине',
    example: 1,
    minimum: 0.001,
    default: 1,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0.001)
  quantity?: number;
}

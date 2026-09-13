import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class AddCartItemDto {
  @ApiPropertyOptional({
    description: 'Количество товара для добавления в корзину',
    example: 1,
    minimum: 0.001,
    default: 1,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0.001)
  quantity?: number;
}

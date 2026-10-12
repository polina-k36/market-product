import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class ChangeReservationItemDto {
  @ApiPropertyOptional({
    description: 'Количество товара для изменения (по умолчанию 1)',
    example: 2,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0.001)
  quantity?: number;
}

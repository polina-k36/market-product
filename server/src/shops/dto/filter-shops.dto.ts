import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class FilterShopsDto {
  @ApiPropertyOptional({
    description: 'Текстовый поиск по адресу магазина',
    example: 'Горького',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Фильтр магазинов по городу',
    example: 'Калининград',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;
}

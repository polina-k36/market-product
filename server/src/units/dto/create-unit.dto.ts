import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateUnitDto {
  @ApiProperty({
    description: 'Краткое название единицы измерения',
    example: 'кг',
    maxLength: 10,
  })
  @IsString()
  @MaxLength(10)
  shortTitle: string;

  @ApiProperty({
    description: 'Полное название единицы измерения',
    example: 'килограмм',
    maxLength: 45,
  })
  @IsString()
  @MaxLength(45)
  fullTitle: string;
}
